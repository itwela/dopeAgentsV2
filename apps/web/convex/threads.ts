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
    agentId: v.string(),
    title: v.string(),
    history: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const threadId = await ctx.db.insert("conversationThreads", {
      threadId: args.threadId,
      userId: args.userId,
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
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const threads = await ctx.db
      .query("conversationThreads")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    
    return threads;
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
