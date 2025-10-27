import { AgentInputItem, user } from '@openai/agents';

/**
 * Extracts string content from various message content formats
 * 
 * Handles multiple content types:
 * - Plain strings
 * - Objects with text/content properties
 * - Arrays of content items
 * - Fallback JSON stringification
 * 
 * @param content - The message content in any format
 * @returns Extracted string content
 */
export const extractContent = (content: any): string => {
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

/**
 * Builds a conversation thread for the OpenAI Agents SDK from saved message history
 * 
 * This function transforms stored Convex messages into the AgentInputItem format
 * required by the OpenAI Agents SDK. It processes the conversation history to provide
 * context for the agent, converting:
 * - User messages → user() input items
 * - Assistant messages → system messages with context about previous responses
 * 
 * The function then appends the current user message to create a complete
 * conversation thread that the agent can process.
 * 
 * @param savedMessages - Array of previously saved messages from Convex database
 *                        Each message has: { role, content, timestamp, agentName?, toolCalls? }
 * @param currentMessage - The new user message to add to the thread
 * @returns Complete conversation thread ready for agent processing
 * 
 * @example
 * ```typescript
 * const savedMessages = [
 *   { role: 'user', content: 'Hello', timestamp: 123456 },
 *   { role: 'assistant', content: 'Hi there!', timestamp: 123457, agentName: 'Hermes' }
 * ];
 * const thread = buildConversationThread(savedMessages, 'What can you do?');
 * // Returns: [user('Hello'), system('Previous assistant response: Hi there!'), user('What can you do?')]
 * ```
 */
export function buildConversationThread(
  savedMessages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: any;
    timestamp: number;
    agentName?: string;
    toolCalls?: Array<{ name: string; arguments: any; result?: any }>;
  }>,
  currentMessage: string
): AgentInputItem[] {
  const conversationThread: AgentInputItem[] = [];

  // Process historical messages to provide context
  for (const msg of savedMessages) {
    if (msg.role === 'user') {
      // Add user messages directly as user input items
      conversationThread.push(user(extractContent(msg.content)));
    } else if (msg.role === 'assistant') {
      // Add assistant messages as system messages to provide context
      // This allows the agent to "remember" previous responses without
      // confusing them with its own current generation
      conversationThread.push({
        role: 'system',
        content: `Previous assistant response: ${extractContent(msg.content)}`
      });
    }
    // Note: system messages from history are implicitly skipped
    // unless you want to preserve them explicitly
  }

  // Add the current user message as the latest input
  conversationThread.push(user(currentMessage));

  return conversationThread;
}

/**
 * Type definition for saved message format (matches Convex schema)
 */
export interface SavedMessage {
  role: 'user' | 'assistant' | 'system';
  content: any;
  timestamp: number;
  agentName?: string;
  toolCalls?: Array<{
    name: string;
    arguments: any;
    result?: any;
  }>;
}

