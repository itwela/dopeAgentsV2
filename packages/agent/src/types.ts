export interface AgentMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

export interface AgentResponse {
  id: string;
  agentId: string;
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface AgentCapability {
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
}

export type AgentStatus = 'idle' | 'processing' | 'error' | 'completed';