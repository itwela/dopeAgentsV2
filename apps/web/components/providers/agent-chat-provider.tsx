"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

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
  agentHandoffs?: Array<{
    from: string;
    to: string;
    timestamp: number;
  }>;
}

interface ConversationThread {
  _id: string;
  threadId: string;
  userId?: string;
  agentId: string;
  title: string;
  history: any[];
  lastUpdated: number;
  createdAt: number;
}

interface AgentChatContextType {
  // Messages
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  
  // Threads
  threads: ConversationThread[];
  currentThreadId: string | null;
  setCurrentThreadId: (threadId: string | null) => void;
  loadThreads: (userId?: string, userName?: string) => Promise<void>;
  createNewThread: () => void;
  selectThread: (threadId: string) => Promise<void>;
  deleteThread: (threadId: string) => Promise<void>;
  
  // Chat state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Current agent
  currentAgent: string;
  setCurrentAgent: (agent: string) => void;
  
  // User info
  userId?: string;
  userName?: string;
}

const AgentChatContext = createContext<AgentChatContextType | undefined>(undefined);

export const useAgentChat = () => {
  const context = useContext(AgentChatContext);
  if (!context) {
    throw new Error('useAgentChat must be used within an AgentChatProvider');
  }
  return context;
};

interface AgentChatProviderProps {
  children: React.ReactNode;
  userId?: string;
  userName?: string;
}

export const AgentChatProvider: React.FC<AgentChatProviderProps> = ({ 
  children, 
  userId,
  userName
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threads, setThreads] = useState<ConversationThread[]>([]);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState('hermes');
  
  // Create convex client once
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  // Load threads for user - no callback needed
  const loadThreads = async (userId?: string, userName?: string) => {
    console.log('[AgentChatProvider] loadThreads called with:', { userId, userName });
    if (!userId && !userName) {
      console.log('[AgentChatProvider] No userId or userName provided, skipping thread load');
      return;
    }
    
    try {
      console.log('[AgentChatProvider] Fetching threads...');
      const userThreads = await convex.query(api.threads.getUserThreads, { userId, userName });
      console.log('[AgentChatProvider] Received threads:', userThreads.length);
      setThreads(userThreads);
    } catch (error) {
      console.error('[AgentChatProvider] Error loading threads:', error);
    }
  };

  // Create new thread - no callback needed
  const createNewThread = () => {
    setCurrentThreadId(null);
    setMessages([]);
  };

  // Select and load a thread - no callback needed
  const selectThread = async (threadId: string) => {
    try {
      const thread = await convex.query(api.threads.getThread, { threadId });
      if (thread) {
        setCurrentThreadId(threadId);
        
        // Convert thread history to messages
        const threadMessages: ChatMessage[] = thread.history
          .filter((item: any) => item.role === 'user' || item.role === 'assistant')
          .map((item: any) => {
            return {
              role: item.role,
              content: item.content || '',
              agentName: item.agentName,
              timestamp: new Date(item.timestamp || Date.now()),
              toolCalls: item.toolCalls,
            };
          });
        setMessages(threadMessages);
        setCurrentAgent(thread.agentId);
      }
    } catch (error) {
      console.error('Error loading thread:', error);
    }
  };

  // Add message to current conversation - no callback needed
  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  // Delete a thread
  const deleteThread = async (threadId: string) => {
    try {
      await convex.mutation(api.threads.deleteThread, { threadId });
      
      // Remove from local state
      setThreads(prev => prev.filter(thread => thread.threadId !== threadId));
      
      // If it was the current thread, reset to no thread
      if (currentThreadId === threadId) {
        setCurrentThreadId(null);
        setMessages([]);
      }
      
      // Reload threads to ensure consistency (will be handled by useEffect)
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  // Load threads on mount
  useEffect(() => {
    if (userId || userName) {
      loadThreads(userId, userName);
    } else {
      // User logged out or not available: clear selection and data
      setCurrentThreadId(null);
      setMessages([]);
      setThreads([]);
    }
  }, [userId, userName]);

  // Refresh threads when current thread is updated
  useEffect(() => {
    if ((userId || userName) && currentThreadId) {
      loadThreads(userId, userName);
    }
  }, [currentThreadId, userId, userName]);

  const value: AgentChatContextType = {
    messages,
    setMessages,
    addMessage,
    threads,
    currentThreadId,
    setCurrentThreadId,
    loadThreads,
    createNewThread,
    selectThread,
    deleteThread,
    isLoading,
    setIsLoading,
    currentAgent,
    setCurrentAgent,
    userId,
    userName,
  };

  return (
    <AgentChatContext.Provider value={value}>
      {children}
    </AgentChatContext.Provider>
  );
};
