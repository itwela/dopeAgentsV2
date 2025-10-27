import z from "zod";

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentName?: string;
  timestamp: Date;
  isToolResult?: boolean; // Flag to identify tool result messages
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
  
  export interface ChatAgent {
    id: string;
    name: string;
    description: string;
    capabilities: string[];
    tools: string[];
  }
  
  export interface AgentChatProps {
    initialAgent?: string;
    className?: string;
    onMessagesChange?: (hasMessages: boolean) => void;
    hasMessages?: boolean;
  }

  export interface PromptCardData {
    id: 'email' | 'transcript';
    title: string;
    prompt: string;
  }

  export interface EmailOutreachFormValues {
    customerName: string;
    websiteUrl: string;
    industry: string;
    primaryLocation: string;
    radius: string;
    desiredDocument: string;
    lastOrderDate?: string; // Only for Print Customer
  }

  export type CustomerType = 'current-dope' | 'print-customer' | 'new-prospect' | null;

  /* ----------------------------------- 
  
  Schemas
  
  -------------------------------------- */

  // Request/Response schemas
export const ChatRequestSchema = z.object({
  message: z.string(),
  threadId: z.string().nullable().optional(),
  agentId: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
});

export const ChatResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  agentName: z.string(),
  history: z.array(z.any()),
  threadId: z.string().optional(),
  lastAgentId: z.string().optional(),
  toolCalls: z.array(z.object({
    name: z.string(),
    arguments: z.any(),
    result: z.any().optional(),
  })).optional(),
  agentHandoffs: z.array(z.object({
    from: z.string(),
    to: z.string(),
    timestamp: z.number(),
  })).optional(),
});