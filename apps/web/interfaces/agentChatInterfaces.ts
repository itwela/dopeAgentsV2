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
    companyName: string;
    websiteUrl: string;
    contactName: string;
    zipCode: string;
  }