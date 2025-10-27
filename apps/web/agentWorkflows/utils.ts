import { ConvexHttpClient } from "convex/browser";
import { user } from "@openai/agents";
import { api } from "../convex/_generated/api";
import { AgentInputItem } from "@openai/agents";

export const initializeConvexClient = () => {
    return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
};

export interface WorkflowConfig {
    userId?: string;
    userName?: string;
    threadId?: string | null;
    clientName?: string;
}

export interface WorkflowResult {
    success: boolean;
    workflowRunId: string;
    finalOutput: string;
    stepResults: Array<{
        stepNumber: number;
        agentName: string;
        stepTitle: string;
        response: string;
        timestamp: number;
    }>;
    title?: string;
    error?: string;
}

const extractContent = (content: any): string => {
    if (typeof content === 'string') return content;
    if (!content) return '';
    if (Array.isArray(content)) {
        return content
            .map((c) => (typeof c === 'string' ? c : (c.text || c.content || JSON.stringify(c))))
            .join(' ');
    }
    if (typeof content === 'object') {
        return content.text || content.content || JSON.stringify(content);
    }
    return String(content);
};

export const getOrCreateThread = async (convex: ConvexHttpClient, threadId: string | null) => {
    let savedMessages: any[] = [];
    let currentThreadId = threadId || null;

    if (currentThreadId) {
        const existingThread = await convex.query(api.threads.getThread, {
            threadId: currentThreadId,
        });
        if (existingThread) {
            savedMessages = existingThread.history || [];
        }
    } else {
        currentThreadId = `thread_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }

    const conversationThread: AgentInputItem[] = [];
    for (const msg of savedMessages) {
        if (msg.role === 'user') {
            conversationThread.push(user(extractContent(msg.content)));
        } else if (msg.role === 'assistant') {
            conversationThread.push({
                role: 'system',
                content: `Previous assistant response: ${extractContent(msg.content)}`,
            });
        }
    }

    return { savedMessages, currentThreadId, conversationThread };
};

export const updateThreadConvex = async (convex: ConvexHttpClient, threadId: string, agentId: string, history: AgentInputItem[]) => {

    await convex.mutation(api.threads.updateThread, {
        threadId: threadId,
        agentId: agentId,
        history: history,
    });

};