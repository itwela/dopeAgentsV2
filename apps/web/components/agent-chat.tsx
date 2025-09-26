"use client"

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Loader2, RefreshCw, Copy, Check, Settings, Mic, MicOff, X, ChevronDown, ChevronRight, Info, Database, BarChart3, Users, FileText, Globe, Search, Brain, Target, TrendingUp, MessageSquare, Lightbulb, Shield, Cpu, Activity, ArrowRight, ExternalLink } from "lucide-react";
import AITextLoading from "./ui/ai-text-loading";
import { useAgentChat } from "./providers/agent-chat-provider";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { AgentInfoModal } from "./agent-info-modal";

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentName?: string;
  timestamp: Date;
  toolCalls?: Array<{
    name: string;
    arguments: any;
    result?: any;
  }>;
}

interface ChatAgent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  tools: string[];
}

interface AgentChatProps {
  initialAgent?: string;
  className?: string;
  onMessagesChange?: (hasMessages: boolean) => void;
  hasMessages?: boolean;
}

export function AgentChat({ initialAgent = 'hermes', className, onMessagesChange, hasMessages = false }: AgentChatProps) {
  const {
    messages,
    setMessages,
    addMessage,
    currentThreadId,
    setCurrentThreadId,
    isLoading,
    setIsLoading,
    currentAgent,
    setCurrentAgent,
    threads,
  } = useAgentChat();

  // Get current user ID from auth
  const currentUser = useQuery(api.auth.currentUser);
  
  const [input, setInput] = useState("");
  const [availableAgents, setAvailableAgents] = useState<ChatAgent[]>([]);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [expandedToolCalls, setExpandedToolCalls] = useState<Set<number>>(new Set());
  const [showInfoModal, setShowInfoModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchAvailableAgents();
  }, []);

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
    // Check if we have user messages (excluding system messages)
    const userMessages = messages.filter(msg => msg.role === 'user');
    const shouldShowInstructions = userMessages.length === 0;
    onMessagesChange?.(!shouldShowInstructions);
  }, [messages, onMessagesChange, shouldAutoScroll]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchAvailableAgents = async () => {
    try {
      const response = await fetch('/api/agents/chat');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAvailableAgents(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput("");
    setIsLoading(true);
    setShouldAutoScroll(true); // Enable auto-scroll for new messages

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const requestBody = {
        message: input,
        threadId: currentThreadId || null,
        agentId: currentAgent,
        userId: currentUser?.subject || null,
      };
      
      console.log('📤 Sending request with user ID:', requestBody.userId);
      console.log('📤 Full request body:', requestBody);
      
      const response = await fetch('/api/agents/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: data.message,
            agentName: data.agentName,
            timestamp: new Date(),
            toolCalls: data.toolCalls,
          };

          addMessage(assistantMessage);
          
          // Update thread ID if this is a new thread
          if (data.threadId && data.threadId !== currentThreadId) {
            setCurrentThreadId(data.threadId);
          }

          // Update current agent if it changed
          if (data.lastAgentId && data.lastAgentId !== currentAgent) {
            setCurrentAgent(data.lastAgentId);
          }
        } else {
          throw new Error(data.error || 'Failed to get response');
        }
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'system',
        content: 'Sorry, there was an error processing your message. Please try again.',
        agentName: 'System',
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Allow new line, then auto-resize
      setTimeout(autoResizeTextarea, 0);
    }
  };

  const clearChat = () => {
    setShouldAutoScroll(false); // Disable auto-scroll when clearing
    setMessages([]);
    setCurrentThreadId(null);
    onMessagesChange?.(false);
  };

  const copyMessage = async (content: any, messageIndex: number) => {
    
    try {
      // Ensure content is always a string for copying
      let textContent = '';
      if (typeof content === 'string') {
        console.log('🔍 COPY DEBUG - Content is string, using as-is');
        textContent = content;
      } else if (content && typeof content === 'object') {
        console.log('🔍 COPY DEBUG - Content is object, extracting text');
        if (content.text) {
          console.log('🔍 COPY DEBUG - Found content.text:', content.text);
          textContent = content.text;
        } else if (content.content) {
          console.log('🔍 COPY DEBUG - Found content.content:', content.content);
          textContent = content.content;
        } else if (Array.isArray(content)) {
          console.log('🔍 COPY DEBUG - Content is array, joining elements');
          textContent = content.map((c: any) => 
            typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))
          ).join(' ');
        } else {
          console.log('🔍 COPY DEBUG - Converting object to JSON string');
          textContent = JSON.stringify(content);
        }
      } else {
        console.log('🔍 COPY DEBUG - Converting to string');
        textContent = String(content || '');
      }
      
      
      await navigator.clipboard.writeText(textContent);
      
      setCopiedMessageIndex(messageIndex);
      
      setTimeout(() => {
        setCopiedMessageIndex(null);
      }, 2000);
      
    } catch (err) {
      console.error('❌ COPY ERROR - Failed to copy text:', err);
      console.error('❌ COPY ERROR - Error details:', {
        name: (err as Error).name,
        message: (err as Error).message,
        stack: (err as Error).stack
      });
    }
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 200; // Maximum height in pixels
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    autoResizeTextarea();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
    setIsRecording(false);
    setIsTranscribing(false);
    setAudioChunks([]);
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.text) {
          setInput(prevInput => prevInput + (prevInput ? ' ' : '') + data.text);
          if (textareaRef.current) {
            textareaRef.current.focus();
            autoResizeTextarea();
          }
        }
      } else {
        throw new Error('Transcription failed');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Error transcribing audio. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const getMessageIcon = (role: string) => {
    switch (role) {
      case 'user':
        return <User className="h-4 w-4" />;
      case 'assistant':
        return <Bot className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const getMessageBgColor = (role: string) => {
    switch (role) {
      case 'user':
        return 'bg-muted foreground ml-12';
      case 'assistant':
        return 'mr-12';
      case 'system':
        return 'bg-secondary mx-12 text-center';
      default:
        return 'bg-muted mr-12';
    }
  };

  const currentAgentInfo = availableAgents.find(agent => agent.id === currentAgent);

  const toggleToolCallsExpansion = (messageIndex: number) => {
    const newExpanded = new Set(expandedToolCalls);
    if (newExpanded.has(messageIndex)) {
      newExpanded.delete(messageIndex);
    } else {
      newExpanded.add(messageIndex);
    }
    setExpandedToolCalls(newExpanded);
  };

  const ToolCalls = ({ toolCalls, messageIndex }: { toolCalls?: Array<{ name: string, arguments: any, result?: any }>, messageIndex: number }) => {
    if (!toolCalls || toolCalls.length === 0) return null;

    const isExpanded = expandedToolCalls.has(messageIndex);

    return (
      <div className="mt-3 border-t border-border/30 pt-3 ">
        <button
          onClick={() => toggleToolCallsExpansion(messageIndex)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left"
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
          <Settings className="h-3 w-3" />
          <span>Tools used ({toolCalls.length})</span>
        </button>
        
        {isExpanded && (
          <div className="mt-2 space-y-2">
            {toolCalls.map((toolCall, index) => (
              <div key={index} className="bg-muted/50 rounded p-2 text-xs break-words">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {toolCall.name}
                  </Badge>
                </div>
                {toolCall.arguments && Object.keys(toolCall.arguments).length > 0 && (
                  <div className="text-muted-foreground mb-2 max-w-full break-words">
                    <strong>Input:</strong>
                    <pre className="bg-muted rounded px-2 py-1 mt-1 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                      {JSON.stringify(toolCall.arguments, null, 2)}
                    </pre>
                  </div>
                )}
                {toolCall.result && (
                  <div className="text-muted-foreground max-w-full break-words">
                    <strong>Output:</strong>
                    <div className="bg-muted rounded px-2 py-1 mt-1 text-xs max-h-40 w-full overflow-auto break-words whitespace-pre-wrap">
                      {typeof toolCall.result === 'string' ? toolCall.result : JSON.stringify(toolCall.result, null, 2)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const MessageActions = ({ message, messageIndex }: { message: ChatMessage, messageIndex: number }) => {
    
    if (message.role !== 'assistant') {
      return null;
    }

    const agentInfo = availableAgents.find(agent => agent.name === message.agentName);
    const isCopied = copiedMessageIndex === messageIndex;
    

    const handleCopyClick = () => {
      copyMessage(message.content, messageIndex);
    };

    return (
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
        <div className="flex flex-wrap gap-1">
          {agentInfo?.capabilities.map((capability) => (
            <Badge key={capability} variant="outline" className="text-xs px-2 py-0.5 text-muted-foreground">
              {capability}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyClick}
          className="h-8 px-2 cursor-pointer z-10 text-muted-foreground hover:text-foreground"
        >
          {isCopied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    );
  };


  // const chatHeight = hasMessages ? 'h-full' : 'h-full';

  // Check if we have user messages (excluding system messages)
  const userMessages = messages.filter(msg => msg.role === 'user');
  const hasUserMessages = userMessages.length > 0;

  if (!hasUserMessages) {
    // Simple view when no messages - just agent name and input
    return (
      <>
      <div className={`flex flex-col h-full items-center justify-center ${className}`}>
        {/* Agent Name */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {currentAgentInfo?.name || currentAgent.charAt(0).toUpperCase() + currentAgent.slice(1)}
          </h1>
          <p className="text-muted-foreground">
            {currentAgentInfo?.description || "AI Assistant"}
          </p>
        </div>

        {/* Agent Selection */}
        <div className="mb-6 flex items-center gap-3">
          <Select value={currentAgent} onValueChange={setCurrentAgent}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              {availableAgents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Info Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInfoModal(true)}
            title="Agent Information & Tools"
            className="h-9 w-9 p-0"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {/* Input */}
        <div className="w-full max-w-2xl">
          <div className="relative border border-border rounded-lg bg-background hover:border-ring transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
            <div className="flex items-end p-3 gap-2">
              <Textarea
                ref={textareaRef}
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                className="flex-1 min-h-[24px] max-h-[200px] resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
                rows={1}
              />
            </div>

            <div className="flex p-2 items-center w-full justify-between gap-2">
              {/* Capability buttons */}
              {currentAgentInfo?.tools && currentAgentInfo.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 py-3">
                  {currentAgentInfo.tools.slice(0, 6).map((tool) => (
                    <Button
                      key={tool}
                      variant="outline"
                      size="sm"
                      className="h-7 cursor-pointer px-3 text-xs rounded-full border-border/50 text-forground hover:border-border hover:bg-accent hover:text-white transition-colors"
                      onClick={() => {
                        const prompt = `I want to use your ${tool.toLowerCase()} tool to`;
                        setInput(prompt);
                        if (textareaRef.current) {
                          textareaRef.current.focus();
                          autoResizeTextarea();
                        }
                      }}
                      disabled={isLoading}
                    >
                      {tool}
                    </Button>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading || isTranscribing}
                  size="sm"
                  variant={isRecording ? "destructive" : "outline"}
                  className="h-8 w-8 p-0 shrink-0"
                >
                  {isRecording ? (
                    <MicOff className="h-3 w-3" />
                  ) : (
                    <Mic className="h-3 w-3" />
                  )}
                </Button>

                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Send className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>

            {/* Audio Recording Panel */}
            {(isRecording || isTranscribing) && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg border border-border animate-in slide-in-from-bottom-2 duration-200">
                <div className="h-full flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    {isRecording ? (
                      <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                          <Mic className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute inset-0 w-8 h-8 bg-red-500/30 rounded-full animate-ping"></div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium">
                        {isRecording ? 'Recording...' : 'Transcribing...'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isRecording 
                          ? 'Speak clearly' 
                          : 'Converting to text...'
                        }
                      </p>
                    </div>
                  </div>

                  {isRecording && (
                    <div className="flex gap-2">
                      <Button
                        onClick={cancelRecording}
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        onClick={stopRecording}
                        size="sm"
                        className="h-7 px-3 text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Done
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            Press Enter to send, Shift+Enter for new line.
          </p>
        </div>
      </div>
      
      <AgentInfoModal 
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        currentAgent={currentAgent}
        availableAgents={availableAgents}
      />
      </>
    );
  }

  // Full chat view when there are messages
  return (
    <>
    <div className="fixed w-full max-w-[80%] top-0 z-20 bg-background  p-4 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {(() => {
              if (currentThreadId) {
                const currentThread = threads.find(thread => thread.threadId === currentThreadId);
                return currentThread?.title || "Chat";
              }
              return "New Chat";
            })()}
          </CardTitle>
          <CardDescription>
            Chat with AI agents that can hand off to specialists
          </CardDescription>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowInfoModal(true)}
            title="Agent Information & Tools"
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={clearChat}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

    <Card className={`flex flex-col h-full border-none ${className} bg-transparent`}>


      <CardContent className="items-center flex flex-col p-0 pt-16 h-full overflow-hidden">
        {/* Messages */}
        <ScrollArea className="flex-1 h-full max-w-6xl w-full place-self-center overflow-hidden">

          <div className="space-y-4 overflow-y-scroll w-full">

            {messages.map((message, index) => {
              
              return (
              <div key={index} className={`flex flex-col ${message.role === 'user' ? 'max-w-[50%] place-self-end' : 'max-w-full place-self-start'}`}>
                <div className={`rounded-lg p-3 ${getMessageBgColor(message.role)}`}>
                  <div className="flex items-start gap-2">
                    {message.role !== 'system' && (
                      <div className="mt-0.5">
                        {getMessageIcon(message.role)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {message.agentName && (
                          <span className="text-xs font-medium opacity-70">
                            {message.agentName}
                          </span>
                        )}
                        <span className="text-xs opacity-50">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => <h1 className="text-2xl font-semibold mb-4 mt-6 text-foreground border-b border-border pb-2 first:mt-0">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-5 text-foreground first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-medium mb-3 mt-4 text-foreground first:mt-0">{children}</h3>,
                            h4: ({ children }) => <h4 className="text-base font-medium mb-2 mt-3 text-foreground first:mt-0">{children}</h4>,
                            p: ({ children }) => <p className="mb-4 text-foreground leading-7 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="mb-4 ml-6 space-y-2 text-foreground [&>li]:list-disc last:mb-0">{children}</ul>,
                            ol: ({ children }) => <ol className="mb-4 ml-6 space-y-2 text-foreground [&>li]:list-decimal last:mb-0">{children}</ol>,
                            li: ({ children }) => <li className="text-foreground leading-7">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                            em: ({ children }) => <em className="italic text-foreground">{children}</em>,
                            code: ({ children, className }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-md text-sm font-mono">{children}</code>
                              ) : (
                                <div className="mb-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                  <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
                                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Code</span>
                                  </div>
                                  <pre className="p-4 overflow-x-auto">
                                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200 leading-relaxed">{children}</code>
                                  </pre>
                                </div>
                              );
                            },
                            pre: ({ children }) => children,
                            blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg mb-4">{children}</blockquote>,
                            a: ({ href, children }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 decoration-1" target="_blank" rel="noopener noreferrer">{children}</a>,
                            hr: () => <hr className="border-gray-200 dark:border-gray-700 my-6" />,
                            table: ({ children }) => (
                              <div className="mb-4 overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">{children}</table>
                              </div>
                            ),
                            thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>,
                            tbody: ({ children }) => <tbody className="bg-white dark:bg-gray-900">{children}</tbody>,
                            tr: ({ children }) => <tr className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">{children}</tr>,
                            th: ({ children }) => <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0">{children}</th>,
                            td: ({ children }) => <td className="px-4 py-3 text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 last:border-r-0">{children}</td>,
                          }}
                        >
                          {(() => {
                            // Ensure content is always a string
                            let content: any = message.content;
                            if (typeof content !== 'string') {
                              if (content && typeof content === 'object') {
                                if ((content as any).text) {
                                  content = (content as any).text;
                                } else if ((content as any).content) {
                                  content = (content as any).content;
                                } else if (Array.isArray(content)) {
                                  content = content.map((c: any) => 
                                    typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))
                                  ).join(' ');
                                } else {
                                  content = JSON.stringify(content);
                                }
                              } else {
                                content = String(content || '');
                              }
                            }
                            return content;
                          })()}
                        </ReactMarkdown>
                      </div>
                      <ToolCalls toolCalls={message.toolCalls} messageIndex={index} />
                    </div>
                  </div>
                  <MessageActions message={message} messageIndex={index} />
                </div>
              </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start w-full">
                <AITextLoading
                  texts={[
                    `${currentAgent.charAt(0).toUpperCase() + currentAgent.slice(1)} is thinking...`,
                    "Processing your request...",
                    "Analyzing data...",
                    "Running tools...",
                  ]}
                  className="text-sm font-medium text-muted-foreground"
                  interval={3618}
                />
              </div>
            )}

            <div ref={messagesEndRef} />

            <div className="h-[200px]"></div>

          </div>

          {/* <div className="h-full min-h-[200px] max-h-[300px] w-full bg-red-500"></div> */}
        </ScrollArea>

        {/* Input */}
        <div className="p-4 max-w-5xl w-[75%] bottom-0 fixed end flex-1">
          <div className="relative border border-border rounded-lg bg-background hover:border-ring transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
            <div className="flex items-end p-3 gap-2">
              <Textarea
                ref={textareaRef}
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                className="flex-1 min-h-[24px] max-h-[200px] resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
                rows={1}
              />
            </div>

            <div className="flex p-2 items-center w-full justify-between gap-2">
              {/* Capability buttons */}
              {currentAgentInfo?.tools && currentAgentInfo.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 py-3">
                  {currentAgentInfo.tools.slice(0, 6).map((tool) => (
                    <Button
                      key={tool}
                      variant="outline"
                      size="sm"
                      className="h-7 cursor-pointer px-3 text-xs rounded-full border-border/50 text-forground hover:border-border hover:bg-accent hover:text-white transition-colors"
                      onClick={() => {
                        const prompt = `I want to use your ${tool.toLowerCase()} tool to`;
                        setInput(prompt);
                        if (textareaRef.current) {
                          textareaRef.current.focus();
                          autoResizeTextarea();
                        }
                      }}
                      disabled={isLoading}
                    >
                      {tool}
                    </Button>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading || isTranscribing}
                  size="sm"
                  variant={isRecording ? "destructive" : "outline"}
                  className="h-8 w-8 p-0 shrink-0"
                >
                  {isRecording ? (
                    <MicOff className="h-3 w-3" />
                  ) : (
                    <Mic className="h-3 w-3" />
                  )}
                </Button>

                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="h-8 w-8 p-0 shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Send className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>

            {/* Audio Recording Panel */}
            {(isRecording || isTranscribing) && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg border border-border animate-in slide-in-from-bottom-2 duration-200">
                <div className="h-full flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    {isRecording ? (
                      <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                          <Mic className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute inset-0 w-8 h-8 bg-red-500/30 rounded-full animate-ping"></div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium">
                        {isRecording ? 'Recording...' : 'Transcribing...'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isRecording 
                          ? 'Speak clearly' 
                          : 'Converting to text...'
                        }
                      </p>
                    </div>
                  </div>

                  {isRecording && (
                    <div className="flex gap-2">
                      <Button
                        onClick={cancelRecording}
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        onClick={stopRecording}
                        size="sm"
                        className="h-7 px-3 text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Done
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Press Enter to send, Shift+Enter for new line.
          </p>
        </div>
      </CardContent>
    </Card>
    <AgentInfoModal 
      isOpen={showInfoModal}
      onClose={() => setShowInfoModal(false)}
      currentAgent={currentAgent}
      availableAgents={availableAgents}
    />
    </>
  );
}
