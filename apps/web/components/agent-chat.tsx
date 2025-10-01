"use client"

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Loader2, RefreshCw, Copy, Check, Settings, Mic, MicOff, X, ChevronDown, ChevronRight, Info, Database, BarChart3, Users, FileText, Globe, Search, Brain, Target, TrendingUp, MessageSquare, Lightbulb, Shield, Cpu, Activity, ArrowRight, ExternalLink, Plus } from "lucide-react";
import AITextLoading from "./ui/ai-text-loading";
import { useAgentChat } from "./providers/agent-chat-provider";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { AgentInfoModal } from "./agent-info-modal";
import { KnowledgeBaseDropdown } from "./knowledge-base-dropdown";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChatMessage, ChatAgent, AgentChatProps, PromptCardData, EmailOutreachFormValues } from "../interfaces/agentChatInterfaces";

// Helper function to extract content from messages
const extractContent = (content: any): string => {
  if (typeof content === 'string') {
    return content;
  } else if (content && typeof content === 'object') {
    if (content.text) return content.text;
    if (content.content) return content.content;
    if (Array.isArray(content)) {
      return content.map(c =>
        typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))
      ).join(' ');
    }
    return JSON.stringify(content);
  }
  return String(content || '');
};

// Tool display names mapping for cleaner user interface
const TOOL_DISPLAY_NAMES: Record<string, string> = {
  // Email & Proposal Tools
  'list_templates': '📧 Email Templates',
  'list_how_to_generate_a_proposal': '📋 Proposal Guide',
  'in_depth_business_analysis': '🔍 Business Analysis',

  // Leadership & Team Tools
  'facilitate_standup': '👥 Standup Meetings',

  // Pinecone Database Tools
  'pinecone_list_indexes': '🗂️ DOPE List Indexes',
  'pinecone_create_index': '➕ DOPE Create Index',
  'pinecone_add_to_index': '📝 DOPE Add Data',
  'pinecone_add_employee_data_to_index': '👤 DOPE Add Employee Data',
  'pinecone_add_transcript_data_to_index': '📄 DOPE Add Transcript',
  'pinecone_semantic_search': '🔎 DOPE Semantic Search',

  // Specialized Pinecone Searches
  'pinecone_company_knowledge_semantic_search': '🏢 DOPE Company Knowledge',
  'pinecone_employee_data_semantic_search': '👥 DOPE Employee Profiles',
  'pinecone_transcript_data_semantic_search': '📝 DOPE Transcript Search',
  'pinecone_email_templates_semantic_search': '📧 DOPE Email Templates Search',
  'pinecone_faq_data_semantic_search': '❓ DOPE FAQ Search',

  // Account Management
  'dope_active_account_lookup': '📊DOPE Account Lookup',
  'dope_active_account_upsert': '➕DOPE Add Account Data',

  // Web Tools
  'web_search': '🌐 Web Search'
};

// Function to get display name for a tool
const getToolDisplayName = (toolName: string): string => {
  return TOOL_DISPLAY_NAMES[toolName] || toolName;
};

const PROMPT_EMAIL_GENERATION: PromptCardData = {
  id: 'email',
  title: 'In-Depth Business Analysis',
  prompt: 'Perform an in-depth business analysis including website research, market insights, and tailored email recommendations for a potential or existing Dope Marketing client.',
};

const PROMPT_TRANSCRIPT_TO_SUMMARY: PromptCardData = {
  id: 'transcript',
  title: 'Transcript → Clean Summary',
  prompt: `You are given raw JSON or structured meeting/transcript data.
Your job is to reformat the data into a clean, copy-friendly structure with these rules:

Output should be plain text, not JSON.

Each field should follow the format:

key: text

No quotes
No curly braces
No brackets

Multi-value fields (like action items, participants, topics) should be written as a list using - bullets under the field name.
Example:

action_items:
- Task one
- Task two

Preserve all useful information (ids, titles, participants, topics, keywords, technologies, etc.).
Keep readability high — use commas for inline lists, bullets for multi-line lists.

Use exactly these fields:

title: best-fit title (improve it if needed)
Meeting Type: interview, call, meeting, presentation, other
Duration: [duration]
Participants: name1, name2, name3
Location: [location or 'Google Meet']
Department: marketing, sales, hr, finance, legal, operations, other
Confidentiality Level: internal, public, confidential, restricted
Action_items:
- [bullet]
- [bullet]
Concepts_discussed:
- [bullet]
Date: [YYYY-MM-DD or best guess]
Key_topics:
- [bullet]
Summary: [3-5 sentence summary]
tags: tag1, tag2, tag3 (max 6)
type: [short type label]`,
};

const PRESET_PROMPTS: PromptCardData[] = [
  PROMPT_EMAIL_GENERATION,
  PROMPT_TRANSCRIPT_TO_SUMMARY,
];

// Style guide used for post-processing of AI responses
const STYLE_GUIDE_PROMPT = `Always format your output for clarity, readability, and visual impact, using Markdown. Adopt a structured, actionable layout with distinct sections, bolding, emojis, bullet points, and tables as demonstrated.

Main Section Headers: Use a relevant emoji followed by a bolded title (e.g., ✅ **Account Snapshot: [Company Name]** or 🎯 **Campaign Strategy Plan**).
Sub-Headers: Use a relevant emoji followed by a bolded title (e.g., 🔥 **Primary Campaign Theme:**, 🧠 **Dope ID Strategy:**).
Bullet Points & Nested Lists: Use - for bullets; indent sub-points by two spaces with -.
Statuses: Use ✅ (done/confirmed), 🔄 (in progress/required), 🔲 (to do/select).
Tables: When presenting structured data, use Markdown tables with headers (Field | Value) and --- separators.
Emojis: Use relevant emojis to enhance visual segmentation; keep tasteful and purposeful.
CTAs: End sections with clear bolded CTAs.
Tone: Maintain a confident, helpful, professional tone.

Critical rule: Do NOT alter the underlying facts or meaning. Only improve formatting and organization.`;


function PromptCard({ data, onSelect }: { data: PromptCardData; onSelect: (text: string) => void }) {
  return (
    <button
      className="rounded-lg border border-border/60 bg-card hover:bg-accent/10 transition-colors text-left p-4"
      onClick={() => onSelect(data.prompt)}
    >
      <div className="text-sm font-medium text-foreground">{data.title}</div>
      <div className="text-xs mt-1 text-muted-foreground line-clamp-2">{data.prompt}</div>
    </button>
  );
}

function EmailOutreachForm({ initial, onSubmit, onCancel }: {
  initial?: Partial<EmailOutreachFormValues>;
  onSubmit: (values: EmailOutreachFormValues) => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState<EmailOutreachFormValues>({
    companyName: initial?.companyName || '',
    websiteUrl: initial?.websiteUrl || '',
    contactName: initial?.contactName || '',
    zipCode: initial?.zipCode || '',
  });

  const handleChange = (field: keyof EmailOutreachFormValues, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rounded-lg p-4 border border-border bg-card">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" value={form.companyName} onChange={(e) => handleChange('companyName', e.target.value)} placeholder="Acme Co." />
        </div>
        <div>
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input id="websiteUrl" value={form.websiteUrl} onChange={(e) => handleChange('websiteUrl', e.target.value)} placeholder="https://example.com" />
        </div>
        <div>
          <Label htmlFor="contactName">Primary Contact Name</Label>
          <Input id="contactName" value={form.contactName} onChange={(e) => handleChange('contactName', e.target.value)} placeholder="Jane Doe" />
        </div>
        <div>
          <Label htmlFor="zipCode">Business ZIP Code (for market analysis)</Label>
          <Input id="zipCode" value={form.zipCode} onChange={(e) => handleChange('zipCode', e.target.value)} placeholder="55117" maxLength={5} />
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        {onCancel && (
          <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        )}
        <Button size="sm" onClick={() => onSubmit(form)}>Use These Details</Button>
      </div>
    </div>
  );
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
  const updateThreadTitle = useMutation(api.threads.updateThreadTitle as any);

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
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailFlowMessageStartIndex, setEmailFlowMessageStartIndex] = useState<number | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [thinkingStartTime, setThinkingStartTime] = useState<Date | null>(null);
  const [thinkingDuration, setThinkingDuration] = useState<number>(0);
  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [selectedMessageContent, setSelectedMessageContent] = useState<string>('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState<string>('');
  const [currentTitleOverride, setCurrentTitleOverride] = useState<string>('');
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsContainerRef.current && !toolsContainerRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /*
  */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const fetchAvailableAgents = async () => {
    try {
      const response = await fetch('/api/agents/chat');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const allowed = ['steve', 'hermes'];
          const filtered = (data.data || []).filter((agent: ChatAgent) => {
            const name = agent?.name?.toLowerCase?.();
            const id = agent?.id?.toLowerCase?.();
            return allowed.includes(name) || allowed.includes(id);
          });
          setAvailableAgents(filtered);
          // Ensure current agent is valid after filtering
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

    // Create enhanced message content with selected tool
    let enhancedContent = outbound;
    if (selectedTools.length > 0) {
      const toolName = getToolDisplayName(selectedTools[0]);
      enhancedContent = `${outbound}\n\n  The user wants you to SPECIFICALLY USE  this tool AT LEAST to generate your response. [Selected Tool: ${selectedTools[0]}]`;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: enhancedContent,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput("");
    setSelectedTools([]); // Clear selected tool after sending
    setIsLoading(true);
    setThinkingStartTime(new Date());
    setShouldAutoScroll(true); // Enable auto-scroll for new messages

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setLastError(null);
    try {
      const requestBody = {
        message: enhancedContent,
        threadId: currentThreadId || null,
        agentId: currentAgent,
        userId: currentUser?.subject || null,
        userName: currentUser?.name || null,
      };

      console.log('📤 Sending request with user info:', { userId: requestBody.userId, userName: requestBody.userName });
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

          // Post-process with style guide (best-effort)

          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: data.message,
            agentName: data.agentName,
            timestamp: new Date(),
            toolCalls: data.toolCalls,
            agentHandoffs: data.agentHandoffs,
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
  const startEditTitle = async () => {
    if (!currentThreadId) return;
    const currentThread = threads.find(t => t.threadId === currentThreadId);
    const existingTitle = currentTitleOverride || currentThread?.title || 'New Chat';
    setTitleDraft(existingTitle);
    setIsEditingTitle(true);

    // Generate a new title using the AI
    try {
      setIsSavingTitle(true);
      const response = await fetch('/api/agents/chat', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: currentThreadId,
          messageContent: messages.slice(-3).map(m => extractContent(m.content)).join(' ').slice(-200) // Last 200 chars of recent messages
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.title) {
          setTitleDraft(data.title);
        }
      }
    } catch (e) {
      console.error('Failed to generate title', e);
    } finally {
      setIsSavingTitle(false);
    }
  };
  const cancelEditTitle = () => {
    setIsEditingTitle(false);
    setTitleDraft('');
  };
  const saveTitle = async () => {
    if (!currentThreadId) return;
    const newTitle = titleDraft.trim() || 'Untitled';
    setIsSavingTitle(true);
    try {
      await updateThreadTitle({ threadId: currentThreadId, title: newTitle } as any);
      setCurrentTitleOverride(newTitle);
      setIsEditingTitle(false);
    } catch (e) {
      console.error('Failed to update thread title', e);
    } finally {
      setIsSavingTitle(false);
    }
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
  const handleSelectTool = (tool: string) => {
    console.log('Tool selected:', tool);
    setSelectedTools(prev => {
      // Only allow one tool at a time - if clicking the same tool, deselect it
      const updatedTools = prev.includes(tool) ? [] : [tool];
      console.log('Selected tools updated:', updatedTools);
      return updatedTools;
    });
  };

  const removeSelectedTool = (tool: string) => {
    setSelectedTools([]);
  };
  const insertFakeThreadWithForm = (title: string, userPrompt: string) => {
    const startIndex = messages.length;
    const fakeUserMessage: ChatMessage = {
      role: 'user',
      content: userPrompt,
      timestamp: new Date(),
    };
    const assistantIntro: ChatMessage = {
      role: 'assistant',
      content: `${title} — please provide the details below to proceed.`,
      agentName: currentAgentInfo?.name || 'Hermes',
      timestamp: new Date(),
    };
    addMessage(fakeUserMessage);
    addMessage(assistantIntro);
    setShowEmailForm(true);
    setShouldAutoScroll(true);
    setEmailFlowMessageStartIndex(startIndex);
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
  // Derived booleans for readability
  const hasCurrentAgentTools = Boolean(currentAgentInfo?.tools && currentAgentInfo.tools.length > 0);


  const isAssistant = (role: string) => role === 'assistant';
  const isUser = (role: string) => role === 'user';
  const isSystem = (role: string) => role === 'system';
  const isNoUserMessages = messages.filter(msg => msg.role === 'user').length === 0;
  const canShowToolsDropdown = !isLoading && hasCurrentAgentTools;
  const isLastMessageAssistantFromCurrent = () => {
    if (messages.length === 0) return false;
    const last = messages[messages.length - 1];
    return isAssistant(last.role) && (last.agentName === (currentAgentInfo?.name || 'Hermes'));
  };

  const toggleToolCallsExpansion = (messageIndex: number) => {
    const newExpanded = new Set(expandedToolCalls);
    if (newExpanded.has(messageIndex)) {
      newExpanded.delete(messageIndex);
    } else {
      newExpanded.add(messageIndex);
    }
    setExpandedToolCalls(newExpanded);
  };

  // Agent Handoff Display Component
  const AgentHandoff = ({ handoffs }: { handoffs?: Array<{ from: string, to: string, timestamp: number }> }) => {
    if (!handoffs || handoffs.length === 0) return null;

    return (
      <div className="mt-3 border-t border-border/30 pt-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <ArrowRight className="h-3 w-3" />
          <span className="font-medium">Agent Handoffs</span>
        </div>
        <div className="space-y-2">
          {handoffs.map((handoff, index) => (
            <div key={index} className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
              <div className="flex items-center gap-1 text-xs">
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {handoff.from}
                </Badge>
                <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                <Badge variant="default" className="text-xs px-2 py-0.5">
                  {handoff.to}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground ml-auto">
                {new Date(handoff.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ToolCalls = ({ toolCalls, messageIndex }: { toolCalls?: Array<{ name: string, arguments: any, result?: any }>, messageIndex: number }) => {
    if (!toolCalls || toolCalls.length === 0) return null;

    const isExpanded = expandedToolCalls.has(messageIndex);

    // Check if this is an agent handoff tool call
    const isAgentHandoff = (toolName: string) => {
      return toolName.includes('handoff') || toolName.includes('delegate') || toolName.includes('agent');
    };

    // Get tool display name with better formatting
    const getToolDisplayName = (toolName: string) => {
      return TOOL_DISPLAY_NAMES[toolName] || toolName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Format tool result for better display
    const formatToolResult = (result: any) => {
      if (typeof result === 'string') {
        return result;
      }
      if (result && typeof result === 'object') {
        // Handle inDepthBusinessAnalysisTool results
        if (result.completeAnalysis) {
          return `🎯 **Complete Business Analysis Pipeline**\n\n**Status:** ✅ All agents completed successfully\n**Total Output:** ${(result.businessData?.length || 0) + (result.marketAnalysis?.length || 0) + (result.emailOptions?.length || 0)} characters\n\n${result.completeAnalysis}`;
        }
        if (result.businessData) {
          return `🔍 **Business Data Extraction Results**\n\n**Agent:** BusinessDataExtraction\n**Status:** ✅ Complete\n**Output Size:** ${result.businessData.length} characters\n\n${result.businessData}`;
        }
        if (result.marketAnalysis) {
          return `📊 **Market Analysis Results**\n\n**Agent:** MarketAnalyst\n**Status:** ✅ Complete\n**Output Size:** ${result.marketAnalysis.length} characters\n\n${result.marketAnalysis}`;
        }
        if (result.emailOptions) {
          return `📧 **Email Creation Results**\n\n**Agent:** EmailCreation\n**Status:** ✅ Complete\n**Output Size:** ${result.emailOptions.length} characters\n\n${result.emailOptions}`;
        }
        // Check for other specific result structures
        if (result.success !== undefined) {
          return `✅ ${result.success ? 'Success' : 'Failed'}: ${result.message || JSON.stringify(result)}`;
        }
        if (result.found !== undefined) {
          return `🔍 ${result.found ? 'Found' : 'Not Found'}: ${JSON.stringify(result)}`;
        }
        return JSON.stringify(result, null, 2);
      }
      return String(result);
    };

    return (
      <div className="mt-3 border-t border-border/30 pt-3">
        <button
          onClick={() => toggleToolCallsExpansion(messageIndex)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left group"
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3 transition-transform" />
          ) : (
            <ChevronRight className="h-3 w-3 transition-transform" />
          )}
          <Settings className="h-3 w-3 group-hover:animate-spin" />
          <span className="font-medium">Tools used ({toolCalls.length})</span>
          {toolCalls.some(tc => isAgentHandoff(tc.name)) && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              Agent Handoff
            </Badge>
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            {toolCalls.map((toolCall, index) => (
              <div key={index} className={`rounded-lg border p-3 text-xs break-words transition-all ${isAgentHandoff(toolCall.name)
                  ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
                  : 'bg-muted/50 border-border/50'
                }`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-md ${isAgentHandoff(toolCall.name)
                      ? 'bg-blue-100 dark:bg-blue-900/50'
                      : 'bg-muted'
                    }`}>
                    {isAgentHandoff(toolCall.name) ? (
                      <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Settings className="h-3 w-3" />
                    )}
                  </div>
                  <Badge
                    variant={isAgentHandoff(toolCall.name) ? "default" : "secondary"}
                    className="text-xs font-medium"
                  >
                    {getToolDisplayName(toolCall.name)}
                  </Badge>
                  {isAgentHandoff(toolCall.name) && (
                    <Badge variant="outline" className="text-xs">
                      Handoff
                    </Badge>
                  )}
                </div>

                {toolCall.arguments && Object.keys(toolCall.arguments).length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1 mb-2">
                      <Database className="h-3 w-3 text-muted-foreground" />
                      <strong className="text-muted-foreground">Input Parameters:</strong>
                    </div>
                    <div className="bg-background/50 rounded border p-2 max-h-32 overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap break-words">
                        {JSON.stringify(toolCall.arguments, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {toolCall.result && (
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <BarChart3 className="h-3 w-3 text-muted-foreground" />
                      <strong className="text-muted-foreground">Result:</strong>
                    </div>
                    <div className={`rounded border p-2 max-h-48 overflow-auto ${isAgentHandoff(toolCall.name)
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
                        : 'bg-background/50'
                      }`}>
                      <div className="text-xs whitespace-pre-wrap break-words">
                        {formatToolResult(toolCall.result)}
                      </div>
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

    const handleKnowledgeClick = () => {
      setSelectedMessageContent(message.content);
      setShowKnowledgeModal(true);
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

        <div className="flex gap-1 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleKnowledgeClick}
            className="h-8 px-2 cursor-pointer text-muted-foreground hover:text-foreground"
            title="Add to Knowledge Base"
          >
            <Brain className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyClick}
            className="h-8 px-2 cursor-pointer text-muted-foreground hover:text-foreground"
          >
            {isCopied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
          <KnowledgeBaseDropdown
            isOpen={showKnowledgeModal}
            onClose={() => setShowKnowledgeModal(false)}
            messageContent={selectedMessageContent}
          />
        </div>

      </div>
    );
  };

  // Check if we have user messages (excluding system messages)
  const userMessages = messages.filter(msg => msg.role === 'user');
  const hasUserMessages = userMessages.length > 0;

  if (!hasUserMessages && !showEmailForm) {
    // Simple view when no messages and email form is not open - just agent name and input
    return (
      <>
        <div className={`flex flex-col h-full items-center justify-center ${className}`}>
          {/* Agent Name */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              {currentAgentInfo?.name || currentAgent.charAt(0).toUpperCase() + currentAgent.slice(1)}
              <Badge variant="secondary" className="text-xs">Account Manager</Badge>
            </h1>
            <p className="text-muted-foreground">
              {currentAgentInfo?.name?.toLowerCase() === 'hermes'
                ? 'Hermes is optimized as an account manager assistant: summarizing health, prepping QBRs, and surfacing upsell opportunities.'
                : (currentAgentInfo?.description || 'AI Assistant')}
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

          {/* Preset Prompt Cards for Account Managers */}
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl px-4">
            {PRESET_PROMPTS.map((card) => (
              <PromptCard
                key={card.title}
                data={card}
                onSelect={(text) => {
                  if (card.id === 'email') {
                    insertFakeThreadWithForm(card.title, text);
                  } else {
                    setInput(text);
                    if (textareaRef.current) {
                      textareaRef.current.focus();
                      autoResizeTextarea();
                    }
                  }
                }}
              />
            ))}
          </div>

          <div className="p-4 max-w-3xl w-[75%] bottom-0 fixed relative place-self-center">

            {/* Tools dropdown overlay */}
            {isToolsOpen && hasCurrentAgentTools ? (
              /*
                         <div className="z-30 max-h-60 overflow-auto rounded-md border border-border bg-popover p-2 shadow-sm">
                            <div className="text-xs px-2 py-1 text-muted-foreground">Tools</div>
                            <div className="mt-1 grid grid-cols-1 gap-1">
                              {currentAgentInfo!.tools.map((tool) => (
                                <Button
                                  key={tool}
                                  variant="ghost"
                                  size="sm"
                                  className="justify-start text-xs h-8"
                                  onClick={() => handleSelectTool(tool)}
                                  disabled={isLoading}
                                >
                                  {tool}
                                </Button>
                              ))}
                            </div>
                          </div>
                          */
              <></>
            ) : null}

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
                {/* Tools button */}
                <div className="py-3">
                  {!isToolsOpen && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Plus button clicked, current isToolsOpen:', isToolsOpen);
                        console.log('canShowToolsDropdown:', canShowToolsDropdown);
                        setIsToolsOpen(true);
                      }}
                      disabled={!canShowToolsDropdown}
                      title="Show tools"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                </div>

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
                    onClick={() => sendMessage()}
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
        </div>

        <AgentInfoModal
          isOpen={showInfoModal}
          onClose={() => setShowInfoModal(false)}
          currentAgent={currentAgent}
          availableAgents={availableAgents}
        />

        {/* Fixed bottom input (shared) */}
        <div className="p-4 max-w-3xl w-[75%] bottom-0 fixed relative place-self-center">

          {/* Tools dropdown overlay */}
          {isToolsOpen && hasCurrentAgentTools ? (
            /*
                       <div className="z-30 max-h-60 overflow-auto rounded-md border border-border bg-popover p-2 shadow-sm">
                          <div className="text-xs px-2 py-1 text-muted-foreground">Tools</div>
                          <div className="mt-1 grid grid-cols-1 gap-1">
                            {currentAgentInfo!.tools.map((tool) => (
                              <Button
                                key={tool}
                                variant="ghost"
                                size="sm"
                                className="justify-start text-xs h-8"
                                onClick={() => handleSelectTool(tool)}
                                disabled={isLoading}
                              >
                                {tool}
                              </Button>
                            ))}
                          </div>
                        </div>
                        */
            <></>
          ) : null}

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
              {/* Tools button */}
              <div className="py-3">
                {!isToolsOpen && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Plus button clicked, current isToolsOpen:', isToolsOpen);
                      console.log('canShowToolsDropdown:', canShowToolsDropdown);
                      setIsToolsOpen(true);
                    }}
                    disabled={!canShowToolsDropdown}
                    title="Show tools"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                )}
              </div>

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
                  onClick={() => sendMessage()}
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
      </>
    );
  }

  // Full chat view when there are messages
  return (
    <>
      <div className="fixed w-full max-w-[80%] top-0 z-20 bg-background  p-4 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <input
                    className="px-2 py-1 rounded border border-input bg-background text-sm"
                    value={titleDraft}
                    onChange={(e) => setTitleDraft(e.target.value)}
                    placeholder="Enter thread title"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        saveTitle();
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        cancelEditTitle();
                      }
                    }}
                  />
                  <Button size="sm" onClick={saveTitle} disabled={isSavingTitle}>
                    {isSavingTitle ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Save'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEditTitle} disabled={isSavingTitle}>Cancel</Button>
                </div>
              ) : (
                <button
                  className="text-left hover:underline decoration-dotted decoration-1"
                  onClick={startEditTitle}
                  title="Click to edit title"
                >
                  {(() => {
                    if (currentThreadId) {
                      const currentThread = threads.find(thread => thread.threadId === currentThreadId);
                      return currentTitleOverride || currentThread?.title || "Chat";
                    }
                    return "New Chat";
                  })()}
                </button>
              )}
            </CardTitle>
            <CardDescription>
              Chat with Dope AI Agents
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
          {lastError && (
            <div className="w-full max-w-4xl mb-3 rounded border border-destructive/40 bg-destructive/10 text-destructive px-3 py-2 text-sm">
              {lastError}
            </div>
          )}
          {/* Messages */}
          <ScrollArea className="flex-1 h-full max-w-6xl w-full place-self-center overflow-hidden">

            <div className="space-y-4 overflow-y-scroll w-full">

              {messages.map((message, index) => {
                if (showEmailForm && index === messages.length - 1 && isAssistant(message.role) && isLastMessageAssistantFromCurrent()) {
                  // Render inline form as a chat message right after assistant intro
                  return (
                    <div key={index} className={`flex flex-col ${'max-w-full place-self-start'}`}>
                      <div className={`rounded-lg p-3 ${getMessageBgColor('assistant')}`}>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">
                            {getMessageIcon('assistant')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {message.agentName && (
                                <span className="text-xs font-medium opacity-70">{message.agentName}</span>
                              )}
                              <span className="text-xs opacity-50">{message.timestamp.toLocaleTimeString()}</span>
                            </div>
                            <div className="text-sm">
                              <EmailOutreachForm
                                onSubmit={(values) => {
                                  // Compose directive instructing Hermes to use the in_depth_business_analysis tool
                                  const directive = [
                                    'SYSTEM DIRECTIVE: Use the tool in_depth_business_analysis with the following parameters.',
                                    '',
                                    'Your goal is to generate a one or two-page strategic analysis for the client. This analysis must accomplish two things:',
                                    '1. Establish Dope Marketing\'s authority by demonstrating a deep understanding of the client\'s market, using data and insights that show we know their market better than they do.',
                                    '2. Act as a powerful conversation starter that compels the client to get on a call or request a full proposal.',
                                    '',
                                    'The analysis should include:',
                                    '- Key market insights and opportunities based on the client\'s business, website, and service area.',
                                    '- Actionable recommendations tailored to their business and local market.',
                                    '- Specific data points, trends, or competitive advantages that position Dope Marketing as the expert.',
                                    '- Email options that can be sent to the client.',
                                    '- A clear, compelling call-to-action inviting the client to schedule a call or request a full proposal.',
                                    '',
                                    'Parameters:',
                                    `websiteName: ${values.websiteUrl}`,
                                    `businessZipCode: ${values.zipCode}`,
                                    `businessName: ${values.companyName || ''}`,
                                    `primaryContactName: ${values.contactName || ''}`,
                                  ].join('\n');

                                  // Send immediately using override to ensure tool call happens server-side
                                  sendMessage(directive);
                                  setShowEmailForm(false);
                                  setShouldAutoScroll(true);
                                }}
                                onCancel={() => {
                                  // Restore to the state prior to entering the flow
                                  if (emailFlowMessageStartIndex !== null) {
                                    setMessages(messages.slice(0, emailFlowMessageStartIndex));
                                  }
                                  setShowEmailForm(false);
                                  setEmailFlowMessageStartIndex(null);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
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
                              remarkPlugins={[remarkGfm]}
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
                                  const content = String(children);
                                  const looksLikeEmailBundle = content.includes('📧') ||
                                    (content.includes('**Option') && content.includes('**Subject:**') && content.includes('**Body:**')) ||
                                    (content.includes('Option') && content.includes('Subject:') && content.includes('Body:'));

                                  if (!isInline && looksLikeEmailBundle) {
                                    return (
                                      <div className="mb-4 rounded-lg border border-border bg-card p-4">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                                      </div>
                                    );
                                  }

                                  return isInline ? (
                                    <code className="bg-gray-100 dark:bg-gray-800 text-foreground px-1.5 py-0.5 rounded-md text-sm font-mono">{children}</code>
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
                          <AgentHandoff handoffs={message.agentHandoffs} />
                        </div>
                      </div>
                      <MessageActions message={message} messageIndex={index} />
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start items-center w-full">
                  {thinkingDuration > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({thinkingDuration}s)
                    </span>
                  )}
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


            {/* Inline tools panel (non-dropdown) */}
            {isToolsOpen && currentAgentInfo?.tools?.length ? (
              <div ref={toolsContainerRef} className="mb-3 rounded-md border border-border bg-card p-2 shadow-sm" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="text-xs text-muted-foreground">Tools</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setIsToolsOpen(false)}
                    disabled={isLoading}
                  >
                    Hide
                  </Button>
                </div>
                <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                  {currentAgentInfo.tools.map((tool) => (
                    <Button
                      key={tool}
                      variant={selectedTools.includes(tool) ? "default" : "outline"}
                      size="sm"
                      className="justify-start text-xs h-8"
                      onClick={() => handleSelectTool(tool)}
                      disabled={isLoading}
                      title={tool}
                    >
                      {getToolDisplayName(tool)}
                      {selectedTools.includes(tool) && <Check className="h-3 w-3 ml-1" />}
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}

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
                {/* Tools dropdown (full chat view) */}
                <div className="relative py-3 flex items-center" ref={toolsContainerRef}>
                  {!isToolsOpen && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Second plus button clicked, current isToolsOpen:', isToolsOpen);
                        console.log('currentAgentInfo?.tools?.length:', currentAgentInfo?.tools?.length);
                        setIsToolsOpen(true);
                      }}
                      disabled={isLoading || !currentAgentInfo?.tools?.length}
                      title="Show tools"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}

                  {/* Selected tool badge */}
                  {selectedTools.length > 0 && (
                    <div className="flex flex-wrap gap-1 p-2">
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => removeSelectedTool(selectedTools[0])}
                        title={`Remove ${getToolDisplayName(selectedTools[0])}`}
                      >
                        {getToolDisplayName(selectedTools[0])}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    </div>
                  )}


                </div>

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
                    onClick={() => sendMessage()}
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
