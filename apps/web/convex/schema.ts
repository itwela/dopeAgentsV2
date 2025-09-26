import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  // Override auth users table to add custom fields
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Custom fields
    role: v.optional(v.string()),
    organization: v.optional(v.string()),
  })
    .index("email", ["email"]) 
    .index("phone", ["phone"]),
  // Employee profiles system
  employeeProfiles: defineTable({
    employeeId: v.string(), // e.g., "E-ORP-0001"
    name: v.string(),
    position: v.optional(v.string()), // Job title/position
    organization: v.optional(v.string()), // Organization
    reportsTo: v.optional(v.string()), // Manager/supervisor
    gender: v.optional(v.string()), // Gender identity
    assessmentDate: v.string(), // ISO date string
    all34: v.array(v.string()), // Top 10 strengths
    leadDomain: v.string(), // Primary domain
    themeDomains: v.object({
      Executing: v.array(v.string()),
      Influencing: v.array(v.string()),
      RelationshipBuilding: v.array(v.string()),
      StrategyThinking: v.array(v.string()),
    }),
    howToCoach: v.string(),
    bestCollabWith: v.string(),
    watchouts: v.string(),
    communicationTips: v.string(),
    motivators: v.array(v.string()),
    demotivators: v.array(v.string()),
    evidenceQuotes: v.array(v.object({
      quote: v.string(),
      section: v.string(),
    })),
    sourceDocUrl: v.string(),
    sourceProvenance: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_employee_id", ["employeeId"]),
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
