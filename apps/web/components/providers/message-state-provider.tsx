"use client"

import { createContext, useContext, useState, useRef, ReactNode } from "react";

interface MessageStateContextType {
  // UI State
  shouldAutoScroll: boolean;
  setShouldAutoScroll: (value: boolean) => void;
  copiedMessageIndex: number | null;
  setCopiedMessageIndex: (value: number | null) => void;
  expandedToolCalls: Set<number>;
  setExpandedToolCalls: (value: Set<number>) => void;
  expandedToolResults: Set<number>;
  setExpandedToolResults: (value: Set<number>) => void;
  showKnowledgeModal: boolean;
  setShowKnowledgeModal: (value: boolean) => void;
  selectedMessageContent: string;
  setSelectedMessageContent: (value: string) => void;
  
  // Refs
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  
  // Error State
  lastError: string | null;
  setLastError: (value: string | null) => void;
  
  // Thinking State
  thinkingStartTime: Date | null;
  setThinkingStartTime: (value: Date | null) => void;
  thinkingDuration: number;
  setThinkingDuration: (value: number) => void;
  
  // Helper Functions
  scrollToBottom: () => void;
  scrollToTop: () => void;
  scrollToBottomManual: () => void;
  toggleToolCallsExpansion: (messageIndex: number) => void;
  toggleToolResultExpansion: (messageIndex: number) => void;
}

const MessageStateContext = createContext<MessageStateContextType | undefined>(undefined);

export function MessageStateProvider({ children }: { children: ReactNode }) {
  // UI State
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const [expandedToolCalls, setExpandedToolCalls] = useState<Set<number>>(new Set());
  const [expandedToolResults, setExpandedToolResults] = useState<Set<number>>(new Set());
  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [selectedMessageContent, setSelectedMessageContent] = useState<string>('');
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Error State
  const [lastError, setLastError] = useState<string | null>(null);
  
  // Thinking State
  const [thinkingStartTime, setThinkingStartTime] = useState<Date | null>(null);
  const [thinkingDuration, setThinkingDuration] = useState<number>(0);
  
  // Helper Functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToTop = () => {
    const scrollViewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollViewport) {
      scrollViewport.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const scrollToBottomManual = () => {
    const scrollViewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollViewport) {
      scrollViewport.scrollTo({ top: scrollViewport.scrollHeight, behavior: "smooth" });
    }
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
  
  const toggleToolResultExpansion = (messageIndex: number) => {
    const newExpanded = new Set(expandedToolResults);
    if (newExpanded.has(messageIndex)) {
      newExpanded.delete(messageIndex);
    } else {
      newExpanded.add(messageIndex);
    }
    setExpandedToolResults(newExpanded);
  };
  
  return (
    <MessageStateContext.Provider
      value={{
        shouldAutoScroll,
        setShouldAutoScroll,
        copiedMessageIndex,
        setCopiedMessageIndex,
        expandedToolCalls,
        setExpandedToolCalls,
        expandedToolResults,
        setExpandedToolResults,
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
      }}
    >
      {children}
    </MessageStateContext.Provider>
  );
}

export function useMessageState() {
  const context = useContext(MessageStateContext);
  if (context === undefined) {
    throw new Error('useMessageState must be used within a MessageStateProvider');
  }
  return context;
}

