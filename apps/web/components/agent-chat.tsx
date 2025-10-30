"use client"

import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { api } from "../convex/_generated/api";
import { AgentChatProps, ChatAgent, ChatMessage } from "../interfaces/agentChatInterfaces";
import { getToolDisplayName } from "../lib/chat-utils";
import { useAudioRecording } from "../hooks/use-audio-recording";
import { useInputHandler } from "../hooks/use-input-handler";
import { AgentInfoModal } from "./agent-info-modal";
import { ChatInput } from "./chat-input";
import { EmptyChatView } from "./chat/empty-chat-view";
import { MessagesList } from "./chat/messages-list";
import { MessageStateProvider, useMessageState } from "./providers/message-state-provider";
import { useAgentChat } from "./providers/agent-chat-provider";
import { useUserData } from "./providers/userDataProvider";
import "./specialCSSClasses.css";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const elementVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

function AgentChatInner({ initialAgent = 'hermes', className, onMessagesChange, hasMessages = false }: AgentChatProps) {
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
  
  const { userName } = useUserData();
  
  const {
    shouldAutoScroll,
    setShouldAutoScroll,
    copiedMessageIndex,
    setCopiedMessageIndex,
    expandedToolCalls,
    expandedToolResults,
    showKnowledgeModal,
    setShowKnowledgeModal,
    selectedMessageContent,
    setSelectedMessageContent,
    messagesEndRef,
    scrollAreaRef,
    lastError,
    setLastError,
    thinkingStartTime,
    setThinkingStartTime,
    thinkingDuration,
    setThinkingDuration,
    scrollToBottom,
    scrollToTop,
    scrollToBottomManual,
    toggleToolCallsExpansion,
    toggleToolResultExpansion,
  } = useMessageState();

  // Get current user ID from auth
  const currentUser = useQuery(api.auth.currentUser);
  const updateThreadTitle = useMutation(api.threads.updateThreadTitle as any);

  // Local state
  const [availableAgents, setAvailableAgents] = useState<ChatAgent[]>([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isWorkflowsOpen, setIsWorkflowsOpen] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const workflowsContainerRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { 
    isRecording, 
    isTranscribing, 
    startRecording: handleStartRecording, 
    stopRecording, 
    cancelRecording 
  } = useAudioRecording();
  
  const {
    input,
    setInput,
    textareaRef,
    handleInputChange,
    handleKeyPress,
    clearInput,
  } = useInputHandler();

  // Get workflow data
  const workflowRuns = useQuery(
    api.threads.getUserWorkflowRuns,
    userName ? { userName: userName } : "skip"
  ) || [];

  const availableWorkflows = workflowRuns.map(workflow => ({
    workflowRunId: workflow.workflowRunId,
    title: workflow.title,
    clientName: workflow.clientName
  }));

  const currentAgentInfo = availableAgents.find(agent => agent.id === currentAgent);
  const hasCurrentAgentTools = Boolean(currentAgentInfo?.tools && currentAgentInfo.tools.length > 0);
  const userMessages = messages.filter(msg => msg.role === 'user');
  const hasUserMessages = userMessages.length > 0;

  // Fetch available agents on mount
  useEffect(() => {
    fetchAvailableAgents();
  }, []);

  // Auto-scroll and notify parent of message changes
  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
    const userMessages = messages.filter(msg => msg.role === 'user');
    const shouldShowInstructions = userMessages.length === 0;
    onMessagesChange?.(!shouldShowInstructions);
  }, [messages, onMessagesChange, shouldAutoScroll]);

  // Timer effect for thinking duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading && thinkingStartTime) {
      interval = setInterval(() => {
        const now = new Date();
        const duration = Math.floor((now.getTime() - thinkingStartTime.getTime()) / 1000);
        setThinkingDuration(duration);
      }, 1000);
    } else if (!isLoading) {
      setThinkingDuration(0);
      setThinkingStartTime(null);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, thinkingStartTime]);

  // Click outside handler for tools and workflows dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Don't close if clicking on textarea
      if (textareaRef.current && (textareaRef.current.contains(target) || textareaRef.current === target)) {
        return;
      }
      // Close tools dropdown if clicking outside of it
      if (toolsContainerRef.current && !toolsContainerRef.current.contains(target)) {
        setIsToolsOpen(false);
      }
      // Close workflows dropdown if clicking outside of it
      if (workflowsContainerRef.current && !workflowsContainerRef.current.contains(target)) {
        setIsWorkflowsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset UI state when thread is cleared
  useEffect(() => {
    if (!currentThreadId && messages.length === 0) {
      resetUIState();
    }
  }, [currentThreadId, messages.length]);

  const fetchAvailableAgents = async () => {
    try {
      const response = await fetch('/api/agents/chat');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const allowed = ['steve', 'hermes', 'dope-admin'];
          const filtered = (data.data || []).filter((agent: ChatAgent) => {
            const name = agent?.name?.toLowerCase?.();
            const id = agent?.id?.toLowerCase?.();
            return allowed.includes(name) || allowed.includes(id);
          });
          setAvailableAgents(filtered);
          const currentIsValid = filtered.some((a: ChatAgent) => a.id === currentAgent);
          if (!currentIsValid && filtered.length > 0) {
            setCurrentAgent(filtered[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const sendMessage = async (overrideMessage?: string) => {
    const outbound = (overrideMessage ?? input).trim();
    if (!outbound || isLoading) return;

    let enhancedContent = outbound;

    // Add workflow ID hint if selected (let the AI decide if it needs to fetch the context)
    if (selectedWorkflowId) {
      const workflowTitle = availableWorkflows.find(w => w.workflowRunId === selectedWorkflowId)?.title;
      enhancedContent += `\n\n[WORKFLOW SELECTED: ${selectedWorkflowId}]\nWorkflow Title: ${workflowTitle}\n\nNote: Use the get_workflow_context tool if you need detailed workflow analysis to answer this question.`;
    }

    // Add tool selection context
    if (selectedTools.length > 0) {
      const toolName = getToolDisplayName(selectedTools[0]);
      enhancedContent = `${enhancedContent}\n\nThe user wants you to SPECIFICALLY USE this tool AT LEAST to generate your response. [Selected Tool: ${selectedTools[0]}]`;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: enhancedContent,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    clearInput();
    setSelectedTools([]);
    setSelectedWorkflowId(null);
    setIsLoading(true);
    setThinkingStartTime(new Date());
    setShouldAutoScroll(true);
    setLastError(null);

    try {
      const requestBody = {
        message: enhancedContent,
        threadId: currentThreadId || null,
        agentId: currentAgent,
        userId: currentUser?.subject || null,
        userName: currentUser?.name || null,
      };

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
            agentHandoffs: data.agentHandoffs,
          };

          addMessage(assistantMessage);

          if (data.threadId && data.threadId !== currentThreadId) {
            setCurrentThreadId(data.threadId);
          }

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
      setLastError((error as Error)?.message || 'Request failed');
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

  const copyMessage = async (content: any, messageIndex: number) => {
    try {
      let textContent = '';
      if (typeof content === 'string') {
        textContent = content;
      } else if (content && typeof content === 'object') {
        if (content.text) {
          textContent = content.text;
        } else if (content.content) {
          textContent = content.content;
        } else if (Array.isArray(content)) {
          textContent = content.map((c: any) =>
            typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))
          ).join(' ');
        } else {
          textContent = JSON.stringify(content);
        }
      } else {
        textContent = String(content || '');
      }

      await navigator.clipboard.writeText(textContent);
      setCopiedMessageIndex(messageIndex);
      setTimeout(() => {
        setCopiedMessageIndex(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSelectTool = (tool: string) => {
    setSelectedTools(prev => {
      const updatedTools = prev.includes(tool) ? [] : [tool];
      return updatedTools;
    });
  };

  const removeSelectedTool = (tool: string) => {
    setSelectedTools([]);
  };

  const handleSelectWorkflow = (workflowId: string | null) => {
    setSelectedWorkflowId(workflowId);
    setIsWorkflowsOpen(false);
  };

  const resetUIState = () => {
    setSelectedTools([]);
    setSelectedWorkflowId(null);
    setIsToolsOpen(true);
    setIsWorkflowsOpen(false);
    setLastError(null);
    setThinkingDuration(0);
    setThinkingStartTime(null);
    setShouldAutoScroll(false);
  };

  const canShowToolsDropdown = !isLoading && hasCurrentAgentTools;

  if (!hasUserMessages) {
    return (
      <>
        <EmptyChatView
          currentAgent={currentAgent}
          currentAgentInfo={currentAgentInfo}
          availableAgents={availableAgents}
          input={input}
          isLoading={isLoading}
          isTranscribing={isTranscribing}
          isRecording={isRecording}
          canShowToolsDropdown={canShowToolsDropdown}
          isToolsOpen={isToolsOpen}
          setIsToolsOpen={setIsToolsOpen}
          selectedTools={selectedTools}
          availableWorkflows={availableWorkflows}
          isWorkflowsOpen={isWorkflowsOpen}
          setIsWorkflowsOpen={setIsWorkflowsOpen}
          selectedWorkflowId={selectedWorkflowId}
          textareaRef={textareaRef}
          toolsContainerRef={toolsContainerRef}
          workflowsContainerRef={workflowsContainerRef}
          onAgentChange={setCurrentAgent}
          onInfoClick={() => setShowInfoModal(true)}
          onInputChange={handleInputChange}
          onKeyDown={(e) => handleKeyPress(e, sendMessage)}
          onSend={() => sendMessage()}
          onStartRecording={handleStartRecording}
          onStopRecording={stopRecording}
          onCancelRecording={cancelRecording}
          onSelectTool={handleSelectTool}
          onRemoveSelectedTool={removeSelectedTool}
          onSelectWorkflow={handleSelectWorkflow}
          getToolDisplayName={getToolDisplayName}
          className={className}
          elementVariants={elementVariants}
          containerVariants={containerVariants}
        />

        <AgentInfoModal
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          currentAgent={currentAgent}
          availableAgents={availableAgents}
        />

        {isLoading && thinkingDuration >= 180 && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="px-3 py-2 text-xs rounded-md border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm text-muted-foreground">
              Some research takes longer to complete. Please hang tight while I finish gathering results.
            </div>
          </div>
        )}
      </>
    );
  }

  // Full chat view when there are messages
  return (
    <>
      <Card className={`flex flex-col h-full w-full flex items-center justify-center border-none ${className} bg-transparent`}>
        <CardContent className="items-center lg:w-[80%] flex flex-col p-0 h-[100%] overflow-hidden">
          {lastError && (
            <div className="w-full max-w-4xl mb-3 rounded border border-destructive/40 bg-destructive/10 text-destructive px-3 py-2 text-sm">
              {lastError}
            </div>
          )}
          
          <ScrollArea ref={scrollAreaRef} className="h-full w-full place-self-center">
            <MessagesList
              messages={messages}
              availableAgents={availableAgents}
              isLoading={isLoading}
              currentAgent={currentAgent}
              thinkingDuration={thinkingDuration}
              copiedMessageIndex={copiedMessageIndex}
              expandedToolCalls={expandedToolCalls}
              expandedToolResults={expandedToolResults}
              showKnowledgeModal={showKnowledgeModal}
              setShowKnowledgeModal={setShowKnowledgeModal}
              selectedMessageContent={selectedMessageContent}
              setSelectedMessageContent={setSelectedMessageContent}
              toggleToolCallsExpansion={toggleToolCallsExpansion}
              toggleToolResultExpansion={toggleToolResultExpansion}
              onCopyMessage={copyMessage}
              messagesEndRef={messagesEndRef}
            />
          </ScrollArea>
        </CardContent>

        
        <ChatInput
          input={input}
          isLoading={isLoading}
          isTranscribing={isTranscribing}
          isRecording={isRecording}
          canShowToolsDropdown={canShowToolsDropdown}
          isToolsOpen={isToolsOpen}
          setIsToolsOpen={setIsToolsOpen}
          selectedTools={selectedTools}
          currentAgentInfo={currentAgentInfo}
          getToolDisplayName={getToolDisplayName}
          onInputChange={handleInputChange}
          onKeyDown={(e) => handleKeyPress(e, sendMessage)}
          onSend={() => sendMessage()}
          onStartRecording={handleStartRecording}
          onStopRecording={stopRecording}
          onCancelRecording={cancelRecording}
          onSelectTool={handleSelectTool}
          onRemoveSelectedTool={removeSelectedTool}
          onScrollToTop={scrollToTop}
          onScrollToBottom={scrollToBottomManual}
          toolsContainerRef={toolsContainerRef}
          workflowsContainerRef={workflowsContainerRef}
          textareaRef={textareaRef}
          placeholder="Type your message..."
          availableWorkflows={availableWorkflows}
          isWorkflowsOpen={isWorkflowsOpen}
          setIsWorkflowsOpen={setIsWorkflowsOpen}
          selectedWorkflowId={selectedWorkflowId}
          onSelectWorkflow={handleSelectWorkflow}
        />
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

// Wrap the component with the MessageStateProvider
export function AgentChat(props: AgentChatProps) {
  return (
    <MessageStateProvider>
      <AgentChatInner {...props} />
    </MessageStateProvider>
  );
}

