import { z } from 'zod';

// Agent configuration schema
export const AgentConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  capabilities: z.array(z.string()),
  model: z.string().default('gpt-4'),
});

export type AgentConfig = z.infer<typeof AgentConfigSchema>;

// Base Agent class
export class Agent {
  public readonly config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = AgentConfigSchema.parse(config);
  }

  async execute(input: string): Promise<string> {
    // Placeholder implementation
    return `Agent ${this.config.name} processed: ${input}`;
  }
}

// Agent factory
export class AgentFactory {
  static create(config: AgentConfig): Agent {
    return new Agent(config);
  }
}

// Export types and utilities
export * from './types';
export * from './utils';