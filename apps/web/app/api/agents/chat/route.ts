import {
  run,
  user,
  withTrace
} from '@openai/agents';
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateThread, updateThreadConvex } from '../../../../agentWorkflows/utils';
import { api } from "../../../../convex/_generated/api";

import { setDefaultOpenAIKey, setTracingExportApiKey } from '@openai/agents';
import { ChatRequestSchema, ChatResponseSchema } from '../../../../interfaces/agentChatInterfaces';

import { titleGeneratorAgent } from '../../../../agentWorkflows/agents';

import { TOOL_DISPLAY_NAMES } from '../../../../agentWorkflows/agentTools';

import { dopeAdminAgent, hermesAgent, steveAgent } from '../../../../agentWorkflows/agents';

setDefaultOpenAIKey(process.env.NODE_ENV === 'production' ? process.env.OPENAI_API_KEY! : process.env.NEXT_PUBLIC_OPENAI_API_KEY!);
setTracingExportApiKey(process.env.NODE_ENV === 'production' ? process.env.OPENAI_API_KEY! : process.env.NEXT_PUBLIC_OPENAI_API_KEY!);
// Ensure Node.js runtime for stdio processes
export const runtime = 'nodejs';


export async function POST(request: NextRequest) {
  
  try {
    /*

    NOTE: OUTLINING WHAT IS HAPPENING IN THE CHAT API, BEFORE ADDDING MORE STUFF POTENTIALLY IN THE FUTURE

    */


    // NOTE: GETTING THE BODY FROM THE REQUEST
    const body = await request.json();
    const { message, threadId, agentId, userId, userName } = ChatRequestSchema.parse(body);

    console.log('[Chat API] Received request with user info:', { userId, userName, threadId });

    // NOTE: INITIALIZING THE CONVEX CLIENT
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


    // NOTE: DETERMINING WHICH AGENT TO START WITH
    // Create fresh agent instances for each request
    // Note: Only Dope Admin has access to MCP servers (Attom, CRM & Dope Core)
    let currentAgent = hermesAgent; // Default to Hermes (no MCP servers)
    if (agentId === 'hermes') {
      currentAgent = hermesAgent;
    } else if (agentId === 'steve') {
      currentAgent = steveAgent;
    } else if (agentId === 'dope-admin') {
      currentAgent = dopeAdminAgent;
    }

    // NOTE: GETTING THE SAVED MESSAGES, CURRENT THREAD ID, AND CONVERSATION THREAD
    const { savedMessages, currentThreadId, conversationThread } = await getOrCreateThread(convex, threadId || null);
    
    // NOTE: ADDING THE NEW USER MESSAGE 
    conversationThread.push(user(message));

    // NOTE: RUNNING THE CHAT SESSION
    let result: any;
    // Run the chat session
    result = await withTrace('Chat Session', async () => {
      return await run(currentAgent, conversationThread, {
        maxTurns: 20, // Limit turns to prevent infinite loops
      });
    });

    // NOTE: EXTRACTING TOOL CALLS FROM THE CHAT SESSION HISTORY
    const toolCalls: Array<{ name: string, arguments: any, result?: any }> = [];
    let agentHandoffs: Array<{ from: string, to: string, timestamp: number }> = [];
    
    if (result.history) {
      const callResults = new Map();

      // NOTE: FIRST PASS: COLLECTING FUNCTION CALL RESULTS
      for (const item of result.history) {
        if (item.type === 'function_call_result') {
          callResults.set(item.callId, item.output);
        }
      }

      // NOTE: SECOND PASS: COLLECTING FUNCTION CALLS AND MATCHING WITH RESULTS
      for (const item of result.history) {
        if (item.type === 'function_call') {
          const toolCall = {
            name: item.name,
            arguments: typeof item.arguments === 'string' ? JSON.parse(item.arguments) : item.arguments,
            result: callResults.get(item.callId)
          };
          
          toolCalls.push(toolCall);
          
          // Detect agent handoffs based on tool name or result
          if (item.name.includes('handoff') || item.name.includes('delegate') || 
              (toolCall.result && typeof toolCall.result === 'object' && 
               (toolCall.result.agentName || toolCall.result.handoffTo))) {
            agentHandoffs.push({
              from: result.lastAgent?.name || currentAgent.name,
              to: toolCall.result?.agentName || toolCall.result?.handoffTo || 'Unknown Agent',
              timestamp: Date.now()
            });
          }
        }
        // NOTE: HANDLING HOSTED TOOL CALLS (LIKE WEB SEARCH)
        else if (item.type === 'hosted_tool_call') {
          toolCalls.push({
            name: item.name,
            arguments: item.providerData?.action || {},
            result: item.status === 'completed' ? 'Search completed successfully' : item.status
          });
        }
      }
    }

    let finalOutput: string = result.finalOutput || 'No response generated';

    // NOTE: CREATE MESSAGE HISTORY FOR SAVING, IN THE CORRECT ORDER, INTO CONVEX.
    // Order: prior history -> user -> final assistant
    const messagesToSave = [
      // NOTE: PRIOR HISTORY
      ...savedMessages,
      // NOTE: NEW USER MESSAGE
      {
        role: 'user',
        content: message,
        timestamp: Date.now(),
        agentName: 'user'
      },
      // NOTE: FINAL ASSISTANT MESSAGE
      {
        role: 'assistant',
        content: finalOutput,
        timestamp: Date.now(),
        agentName: result.lastAgent?.name || currentAgent.name,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined
      }
    ];

    // NOTE: SAVING TO CONVEX - SIMPLE CREATE/UPDATE WITHOUT AUTO-GENERATING TITLES
    if (currentThreadId) {

      // NOTE: IF THE SAVED MESSAGES ARE EMPTY, CREATE A NEW THREAD
      if (savedMessages.length === 0) {
        // NOTE: CREATE NEW THREAD WITH A SIMPLE DEFAULT TITLE
        console.log('[Chat API] Creating new thread with:', { threadId: currentThreadId, userId, userName });
        await convex.mutation(api.threads.createThread, {
          threadId: currentThreadId,
          userId: userId,
          userName: userName,
          agentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId || 'hermes',
          title: "New Chat",
          history: messagesToSave,
        });

        // NOTE: GENERATE A TITLE FROM THE LATEST USER MESSAGE (LAST 100 CHARS)
        const latestUserMessage = message.slice(-100);
        try {
          // NOTE: GENERATING A BETTER TITLE FROM THE LATEST USER MESSAGE (LAST 100 CHARS)
          const titleGen = await run(titleGeneratorAgent, [user(`Title for: ${latestUserMessage}`)], { maxTurns: 1 });
          const generatedTitle = (titleGen.finalOutput || '').trim();
          if (generatedTitle) {
            // NOTE: UPDATING THE THREAD TITLE
            await convex.mutation(api.threads.updateThreadTitle, {
              threadId: currentThreadId,
              title: generatedTitle,
            });
          }
        } catch (e) {
          console.warn('Title generation failed, keeping default title');
        }
      } else {
        // NOTE: UPDATE EXISTING THREAD WITHOUT OVERWRITING TITLE
        await updateThreadConvex(convex, currentThreadId, result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId, messagesToSave);
      }
    }

    // NOTE: CREATING THE RESPONSE
    const response = ChatResponseSchema.parse({
      success: true,
      message: finalOutput,
      agentName: result.lastAgent?.name || currentAgent.name,
      history: messagesToSave,
      threadId: currentThreadId,
      lastAgentId: result.lastAgent?.name.toLowerCase().replace(/\s+/g, '-') || agentId,
      toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
      agentHandoffs: agentHandoffs.length > 0 ? agentHandoffs : undefined,
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Sorry, I encountered an error processing your request.',
        agentName: 'System',
        history: [],
      },
      { status: 500 }
    );
  } finally {
     console.log('[Chat API] Chat session completed');
  }
}

// GET endpoint to retrieve available agents
export async function GET() {
  try {
    const agents = [
      {
        id: 'hermes',
        name: 'Hermes',
        description: 'Account Manager Assistant - Orchestrates comprehensive business analysis workflows using specialized agent tools for data extraction, market analysis, and email creation.',
        capabilities: ['web-search', 'agent-orchestration', 'business-analysis', 'market-research', 'email-generation', 'client-analysis', 'sales-support'],
        tools: [
          'web_search',
          'business_data_extraction',
          'zip_code_analysis', 
          'email_creation',
          'dope_active_account_lookup',
          'pinecone_company_knowledge_semantic_search', 
          'pinecone_transcript_data_semantic_search',
        ],
      },
      {
        id: 'steve',
        name: 'Steve',
        description: 'Leadership Agent - Leverages CliftonStrengths and employee profiles for team development',
        capabilities: ['web-search', 'team-collaboration', 'standup-facilitation', 'performance-improvement'],
        tools: [
          'web_search',
//          'facilitate_standup', 
          'pinecone_company_knowledge_semantic_search', 
          'pinecone_employee_data_semantic_search', 
          'pinecone_transcript_data_semantic_search', 
        ],
      },
      {
        id: 'dope-admin',
        name: 'Dope Admin',
        description: 'Dope Marketing Admin Agent - Helps the engineer complete any tasks and is helpful overall. Has access to Attom (MongoDB), CRM (MongoDB), and Dope Core (PostgreSQL) database tools when configured.',
        capabilities: ['web-search', 'admin-support', 'database-management', 'data-analysis', 'attom-database', 'crm-database', 'dope-core-database'],
        tools: [
          'web_search', 
          'dope_active_account_lookup', 
          'dope_active_account_upsert', 
          'pinecone_list_indexes', 
          'pinecone_create_index', 
          'pinecone_add_to_index', 
          'pinecone_add_employee_data_to_index', 
          'pinecone_add_transcript_data_to_index', 
          'pinecone_semantic_search',
        ],
      },
    ];

    return NextResponse.json({
      success: true,
      data: agents,
      toolDisplayNames: TOOL_DISPLAY_NAMES,
    });

  } catch (error) {
    console.error('Error fetching chat agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

// PUT endpoint to generate a new title for a thread
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { threadId, messageContent } = body;

    if (!threadId || !messageContent) {
      return NextResponse.json(
        { success: false, error: 'Thread ID and message content are required' },
        { status: 400 }
      );
    }

    // Generate title using the title generator agent
    const titleResult = await run(titleGeneratorAgent, [user(`Generate a title for this conversation: ${messageContent}`)], { maxTurns: 1 });
    const generatedTitle = (titleResult.finalOutput || '').trim() || 'New Chat';

    return NextResponse.json({
      success: true,
      title: generatedTitle,
    });

  } catch (error) {
    console.error('Title generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate title' },
      { status: 500 }
    );
  }
}

