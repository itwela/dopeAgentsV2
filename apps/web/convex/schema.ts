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
  // Projects to organize threads (optional association)
  projects: defineTable({
    projectId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project_id", ["projectId"]) 
    .index("by_user_id", ["userId"]) 
    .index("by_user_name", ["userName"]),
  conversationThreads: defineTable({
    threadId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()), // User's actual name for filtering
    agentId: v.string(),
    title: v.string(),
    projectId: v.optional(v.string()),
    history: v.array(v.any()), // AgentInputItem[]
    lastUpdated: v.number(),
    createdAt: v.number(),
  })
    .index("by_thread_id", ["threadId"])
    .index("by_user_id", ["userId"])
    .index("by_user_name", ["userName"])
    .index("by_agent_id", ["agentId"]) 
    .index("by_project_id", ["projectId"]),
  dopeActiveAccounts: defineTable({
    account_id: v.optional(v.string()),
    hubspot_id: v.optional(v.string()),
    account_name: v.string(),
    industry: v.optional(v.string()),
    // Year-specific column with months nested inside (requested shape)
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
    
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("by_account_name", ["account_name"]),
  
  // Workflow system tables
  workflowRuns: defineTable({
    workflowRunId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    title: v.string(),
    clientName: v.optional(v.string()),
    threadId: v.optional(v.string()),
    status: v.string(), // running, completed, failed
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
    metadata: v.optional(v.any()),
  })
    .index("by_workflow_run_id", ["workflowRunId"])
    .index("by_user_id", ["userId"])
    .index("by_user_name", ["userName"])
    .index("by_thread_id", ["threadId"])
    .index("by_status", ["status"])
    .index("by_client_name", ["clientName"]),
    
  workflowResults: defineTable({
    workflowRunId: v.string(),
    userId: v.optional(v.string()),
    userName: v.optional(v.string()),
    stepNumber: v.number(),
    agentName: v.string(),
    stepTitle: v.string(),
    response: v.string(),
    timestamp: v.number(),
    threadId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  })
    .index("by_workflow_run_id", ["workflowRunId"])
    .index("by_user_id", ["userId"])
    .index("by_user_name", ["userName"])
    .index("by_thread_id", ["threadId"])
    .index("by_workflow_run_and_step", ["workflowRunId", "stepNumber"]),

  // Clients table for workflow management
  clients: defineTable({
    clientId: v.string(),
    userId: v.string(),
    userName: v.string(),
    name: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_client_id", ["clientId"])
    .index("by_user_id", ["userId"])
    .index("by_user_name", ["userName"]),
});
