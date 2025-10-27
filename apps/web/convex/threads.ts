import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getThread = query({
  args: { threadId: v.string() },
  handler: async (ctx, args) => {
    const thread = await ctx.db
      .query("conversationThreads")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .first();
    
    return thread;
  },
});

export const createThread = mutation({
  args: {
    threadId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    agentId: v.string(),
    title: v.string(),
    projectId: v.optional(v.string()),
    history: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const threadId = await ctx.db.insert("conversationThreads", {
      threadId: args.threadId,
      userId: args.userId,
      userName: args.userName,
      agentId: args.agentId,
      title: args.title,
      projectId: args.projectId,
      history: args.history,
      lastUpdated: now,
      createdAt: now,
    });
    
    return threadId;
  },
});

export const updateThread = mutation({
  args: {
    threadId: v.string(),
    agentId: v.optional(v.string()),
    title: v.optional(v.string()),
    projectId: v.optional(v.string()),
    history: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const existingThread = await ctx.db
      .query("conversationThreads")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .first();
    
    if (!existingThread) {
      throw new Error("Thread not found");
    }
    
    await ctx.db.patch(existingThread._id, {
      agentId: args.agentId ?? existingThread.agentId,
      title: args.title ?? existingThread.title,
      projectId: args.projectId ?? existingThread.projectId,
      history: args.history,
      lastUpdated: Date.now(),
    });
    
    return existingThread._id;
  },
});

export const updateThreadTitleOnly = mutation({
  args: {
    threadId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const existingThread = await ctx.db
      .query("conversationThreads")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .first();
    if (!existingThread) {
      throw new Error("Thread not found");
    }
    await ctx.db.patch(existingThread._id, {
      title: args.title,
      lastUpdated: Date.now(),
    });
    return existingThread._id;
  },
});

export const deleteThread = mutation({
  args: { threadId: v.string() },
  handler: async (ctx, args) => {
    const thread = await ctx.db
      .query("conversationThreads")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .first();
    
    if (thread) {
      await ctx.db.delete(thread._id);
      return true;
    }
    
    return false;
  },
});

export const getUserThreads = query({
  args: { 
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    console.log('[getUserThreads] Querying for:', { userId: args.userId, userName: args.userName });
    
    // Try to find by userName first (more reliable), then fall back to userId
    let threads;
    if (args.userName) {
      threads = await ctx.db
        .query("conversationThreads")
        .withIndex("by_user_name", (q) => q.eq("userName", args.userName))
        .order("desc")
        .collect();
      console.log('[getUserThreads] Found threads by userName:', threads.length);
    } else if (args.userId) {
      threads = await ctx.db
        .query("conversationThreads")
        .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
        .order("desc")
        .collect();
      console.log('[getUserThreads] Found threads by userId:', threads.length);
    } else {
      console.log('[getUserThreads] No userId or userName provided');
      return [];
    }
    
    return threads;
  },
});

// Debug query to get all threads (for debugging only)
export const getAllThreads = query({
  args: {},
  handler: async (ctx) => {
    const threads = await ctx.db
      .query("conversationThreads")
      .order("desc")
      .collect();
    
    return threads.map(t => ({
      threadId: t.threadId,
      userId: t.userId,
      title: t.title,
      createdAt: t.createdAt,
    }));
  },
});

export const updateThreadTitle = mutation({
  args: {
    threadId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const existingThread = await ctx.db
      .query("conversationThreads")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .first();
    
    if (!existingThread) {
      throw new Error("Thread not found");
    }
    
    await ctx.db.patch(existingThread._id, {
      title: args.title,
      lastUpdated: Date.now(),
    });
    
    return existingThread._id;
  },
});

// Dope Active Accounts: upsert and lookup by account name
export const upsertDopeActiveAccount = mutation({
  args: {
    account: v.object({
      account_id: v.optional(v.string()),
      hubspot_id: v.optional(v.string()),
      account_name: v.string(),
      industry: v.optional(v.string()),
      year_2025: v.optional(
        v.object({
          Jan: v.optional(v.string()),
          Feb: v.optional(v.string()),
          Mar: v.optional(v.string()),
          Apr: v.optional(v.string()),
          May: v.optional(v.string()),
          Jun: v.optional(v.string()),
          Jul: v.optional(v.string()),
          Aug: v.optional(v.string()),
          Sep: v.optional(v.string()),
          Oct: v.optional(v.string()),
          Nov: v.optional(v.string()),
          Dec: v.optional(v.string()),
        })
      ),
      
    })
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("dopeActiveAccounts")
      .withIndex("by_account_name", (q) => q.eq("account_name", args.account.account_name))
      .first();
    const baseData = {
      account_id: args.account.account_id,
      hubspot_id: args.account.hubspot_id,
      account_name: args.account.account_name,
      industry: args.account.industry,
      year_2025: args.account.year_2025 ? { ...args.account.year_2025 } : (existing?.year_2025 as any) || undefined,
    } as any;

    if (existing) {
      await ctx.db.patch(existing._id, { ...baseData, updatedAt: now });
      return existing._id;
    }
    return await ctx.db.insert("dopeActiveAccounts", { ...baseData, createdAt: now, updatedAt: now });
  }
});

export const getDopeActiveAccountByName = query({
  args: { account_name: v.string() },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("dopeActiveAccounts")
      .withIndex("by_account_name", (q) => q.eq("account_name", args.account_name))
      .first();
    return doc || null;
  }
});

// ===== WORKFLOW MANAGEMENT FUNCTIONS =====

export const createWorkflowRun = mutation({
  args: {
    workflowRunId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    title: v.string(),
    clientName: v.optional(v.string()),
    threadId: v.optional(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("workflowRuns", {
      workflowRunId: args.workflowRunId,
      userId: args.userId,
      userName: args.userName,
      title: args.title,
      clientName: args.clientName,
      threadId: args.threadId,
      status: args.status,
      createdAt: now,
      metadata: {}
    });
    return id;
  },
});

export const saveWorkflowResult = mutation({
  args: {
    workflowRunId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    stepNumber: v.number(),
    agentName: v.string(),
    stepTitle: v.string(),
    response: v.string(),
    threadId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("workflowResults", {
      workflowRunId: args.workflowRunId,
      userId: args.userId,
      userName: args.userName,
      stepNumber: args.stepNumber,
      agentName: args.agentName,
      stepTitle: args.stepTitle,
      response: args.response,
      timestamp: now,
      threadId: args.threadId,
      metadata: args.metadata,
    });
    return id;
  },
});

export const getWorkflowResults = query({
  args: { workflowRunId: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("workflowResults")
      .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
      .order("asc")
      .collect();
    return results;
  },
});

export const getUserWorkflowRuns = query({
  args: { 
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let runs;
    if (args.userName) {
      runs = await ctx.db
        .query("workflowRuns")
        .withIndex("by_user_name", (q) => q.eq("userName", args.userName))
        .order("desc")
        .collect();
    } else if (args.userId) {
      runs = await ctx.db
        .query("workflowRuns")
        .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
        .order("desc")
        .collect();
    } else {
      return [];
    }
    return runs;
  },
});

export const getClientWorkflowRuns = query({
  args: {
    clientName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workflowRuns")
      .withIndex("by_client_name", (q) => q.eq("clientName", args.clientName))
      .order("desc")
      .collect();
  },
});

export const getClientWorkflowCounts = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    // Get all workflow runs for this user
    const workflowRuns = await ctx.db
      .query("workflowRuns")
      .withIndex("by_user_name", (q) => q.eq("userName", args.userName))
      .collect();
    
    // Count workflows by client name
    const clientCounts: Record<string, number> = {};
    workflowRuns.forEach((run) => {
      if (run.clientName) {
        clientCounts[run.clientName] = (clientCounts[run.clientName] || 0) + 1;
      }
    });
    
    return clientCounts;
  },
});

export const getWorkflowRun = query({
  args: {
    workflowRunId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workflowRuns")
      .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
      .first();
  },
});

export const deleteWorkflowRun = mutation({
  args: {
    workflowRunId: v.string(),
  },
  handler: async (ctx, args) => {
    // Delete the workflow run
    const workflowRun = await ctx.db
      .query("workflowRuns")
      .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
      .first();
    
    if (workflowRun) {
      await ctx.db.delete(workflowRun._id);
    }
    
    // Delete all associated workflow results
    const results = await ctx.db
      .query("workflowResults")
      .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
      .collect();
    
    for (const result of results) {
      await ctx.db.delete(result._id);
    }
    
    return { success: true, deletedCount: results.length + 1 };
  },
});

export const updateWorkflowRunStatus = mutation({
  args: {
    workflowRunId: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const run = await ctx.db
      .query("workflowRuns")
      .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
      .first();
    
    if (!run) {
      throw new Error(`Workflow run not found: ${args.workflowRunId}`);
    }
    
    const updates: any = {
      status: args.status,
    };
    
    if (args.status === 'completed') {
      updates.completedAt = Date.now();
    }
    
    await ctx.db.patch(run._id, updates);
    return run._id;
  },
});

// Create thread from workflow results
export const createThreadFromWorkflow = mutation({
  args: {
    workflowRunId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      console.log('[createThreadFromWorkflow] Starting for workflowRunId:', args.workflowRunId);
      
      // Get the workflow run
      const workflowRun = await ctx.db
        .query("workflowRuns")
        .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
        .first();
      
      if (!workflowRun) {
        console.error('[createThreadFromWorkflow] Workflow run not found:', args.workflowRunId);
        throw new Error(`Workflow run not found: ${args.workflowRunId}`);
      }
      
      // Check if a thread already exists for this workflow
      const existingThreadId = workflowRun.threadId;
      if (existingThreadId) {
        const existingThread = await ctx.db
          .query("conversationThreads")
          .withIndex("by_thread_id", (q) => q.eq("threadId", existingThreadId))
          .first();
        
        if (existingThread) {
          console.log('[createThreadFromWorkflow] Returning existing thread');
          return {
            threadId: existingThread.threadId,
            title: existingThread.title,
          };
        }
      }
      
      // Get all workflow results
      const results = await ctx.db
        .query("workflowResults")
        .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
        .order("asc")
        .collect();
      
      if (results.length === 0) {
        throw new Error("No workflow results found");
      }
      
      // Format all results into a comprehensive context message
      let contextMessage = `# Workflow Analysis Results\n\n`;
      contextMessage += `**Client:** ${workflowRun.clientName || 'N/A'}\n`;
      contextMessage += `**Analysis Date:** ${new Date(workflowRun.createdAt).toLocaleDateString()}\n\n`;
      contextMessage += `---\n\n`;
      
      for (const result of results) {
        contextMessage += `## Step ${result.stepNumber}: ${result.stepTitle}\n\n`;
        contextMessage += `**Agent:** ${result.agentName}\n\n`;
        
        // Truncate response if too long (keep first 10000 chars)
        const truncatedResponse = result.response.length > 10000 
          ? result.response.substring(0, 10000) + '\n\n...[Content truncated for brevity]...'
          : result.response;
        
        contextMessage += `${truncatedResponse}\n\n`;
        contextMessage += `---\n\n`;
      }
      
      contextMessage += `\nYou can now ask me questions about this workflow analysis, request specific insights, or explore any aspect of the results in more detail.`;
      
      // Create a new thread with the workflow context
      const threadId = `workflow-thread-${args.workflowRunId}`;
      const now = Date.now();
      
      const history: Array<any> = [
        {
          role: 'system' as const,
          content: contextMessage,
          timestamp: now,
          agentName: 'Workflow Context',
        }
      ];
      
      await ctx.db.insert("conversationThreads", {
        threadId,
        userId: args.userId,
        userName: args.userName,
        agentId: 'hermes',
        title: `Chat: ${workflowRun.title}`,
        history,
        lastUpdated: now,
        createdAt: now,
      });
      
      // Link the thread back to the workflow run
      await ctx.db.patch(workflowRun._id, {
        threadId,
      });
      
      return {
        threadId,
        title: `Chat: ${workflowRun.title}`,
      };
    } catch (error) {
      console.error('[createThreadFromWorkflow] Error:', error);
      throw error;
    }
  },
});

export const updateWorkflowRun = mutation({
  args: {
    workflowRunId: v.string(),
    title: v.optional(v.string()),
    status: v.optional(v.string()),
    completedAt: v.optional(v.number()),
    metadata: v.optional(v.any()),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const workflowRun = await ctx.db
      .query("workflowRuns")
      .withIndex("by_workflow_run_id", (q) => q.eq("workflowRunId", args.workflowRunId))
      .first();
    
    if (!workflowRun) {
      throw new Error("Workflow run not found");
    }
    
    const updates: any = {};
    if (args.title !== undefined) updates.title = args.title;
    if (args.status !== undefined) updates.status = args.status;
    if (args.completedAt !== undefined) updates.completedAt = args.completedAt;
    if (args.metadata !== undefined) updates.metadata = args.metadata;
    
    await ctx.db.patch(workflowRun._id, updates);
    return { success: true };
  },
});
