import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createProject = mutation({
  args: {
    projectId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("projects", {
      projectId: args.projectId,
      name: args.name,
      description: args.description,
      userId: args.userId,
      userName: args.userName,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_project_id", (q) => q.eq("projectId", args.projectId))
      .first();
    if (!existing) throw new Error("Project not found");
    await ctx.db.patch(existing._id, {
      name: args.name ?? existing.name,
      description: args.description ?? existing.description,
      updatedAt: Date.now(),
    });
    return existing._id;
  },
});

export const deleteProject = mutation({
  args: { projectId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_project_id", (q) => q.eq("projectId", args.projectId))
      .first();
    if (!existing) return false;
    await ctx.db.delete(existing._id);
    return true;
  },
});

export const getProject = query({
  args: { projectId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_project_id", (q) => q.eq("projectId", args.projectId))
      .first();
  },
});

export const listProjectsForUser = query({
  args: {
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.userName) {
      return await ctx.db
        .query("projects")
        .withIndex("by_user_name", (q) => q.eq("userName", args.userName))
        .order("desc")
        .collect();
    }
    if (args.userId) {
      return await ctx.db
        .query("projects")
        .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
        .order("desc")
        .collect();
    }
    return [];
  },
});

export const assignThreadToProject = mutation({
  args: {
    threadId: v.string(),
    projectId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const thread = await ctx.db
      .query("conversationThreads")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .first();
    if (!thread) throw new Error("Thread not found");

    let projectIdToSet: string | undefined = undefined;
    if (args.projectId) {
      const project = await ctx.db
        .query("projects")
        .withIndex("by_project_id", (q) => q.eq("projectId", args.projectId ?? ""))
        .first();
      if (!project) throw new Error("Project not found");
      projectIdToSet = args.projectId;
    }

    await ctx.db.patch(thread._id, {
      projectId: projectIdToSet,
      lastUpdated: Date.now(),
    });
    return thread._id;
  },
});

export const listThreadsInProject = query({
  args: { projectId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversationThreads")
      .withIndex("by_project_id", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});


