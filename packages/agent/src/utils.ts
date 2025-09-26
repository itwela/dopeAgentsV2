import type { AgentMessage, AgentResponse } from './types';

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function createMessage(
  content: string,
  role: AgentMessage['role'] = 'user'
): AgentMessage {
  return {
    id: generateId(),
    content,
    role,
    timestamp: new Date(),
  };
}

export function createResponse(
  agentId: string,
  content: string,
  metadata?: Record<string, unknown>
): AgentResponse {
  return {
    id: generateId(),
    agentId,
    content,
    timestamp: new Date(),
    metadata,
  };
}

export function formatTimestamp(date: Date): string {
  return date.toISOString();
}