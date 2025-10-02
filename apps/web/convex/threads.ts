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
