import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  // Optional: extend users table with custom fields if desired later
  conversationThreads: defineTable({
    threadId: v.string(),
    userId: v.optional(v.string()),
    agentId: v.string(),
    title: v.string(),
    history: v.array(v.any()), // AgentInputItem[]
    lastUpdated: v.number(),
    createdAt: v.number(),
  })
    .index("by_thread_id", ["threadId"])
    .index("by_user_id", ["userId"])
    .index("by_agent_id", ["agentId"]),
});
