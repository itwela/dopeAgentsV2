import { v } from "convex/values";
import { mutation, query, internalAction, internalQuery, action } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal, api } from "./_generated/api";

/**
 * Create an employee profile from JSON data
 */
export const createEmployeeProfile = mutation({
  args: {
    profileData: v.string(), // JSON string to parse
  },
  returns: v.id("employeeProfiles"),
  handler: async (ctx, args) => {
    try {
      const data = JSON.parse(args.profileData);
      
      // Validate required fields
      if (!data.employee_id || !data.name) {
        throw new Error("Missing required fields: employee_id and name");
      }

      // Check if employee already exists
      const existing = await ctx.db
        .query("employeeProfiles")
        .withIndex("by_employee_id", (q) => q.eq("employeeId", data.employee_id))
        .first();

      if (existing) {
        throw new Error(`Employee profile with ID ${data.employee_id} already exists`);
      }

      const now = Date.now();

      const profileId = await ctx.db.insert("employeeProfiles", {
        employeeId: data.employee_id,
        name: data.name,
        position: data.position || undefined,
        organization: data.organization || undefined,
        reportsTo: data.reports_to || undefined,
        gender: data.gender || undefined,
        assessmentDate: data.assessment_date || "",
        all34: data.all34 || [],
        leadDomain: data.lead_domain || "",
        themeDomains: {
          Executing: data.theme_domains?.Executing || [],
          Influencing: data.theme_domains?.Influencing || [],
          RelationshipBuilding: data.theme_domains?.["Relationship Building"] || [],
          StrategyThinking: data.theme_domains?.["Strategic Thinking"] || [],
        },
        howToCoach: data.how_to_coach || "",
        bestCollabWith: data.best_collab_with || "",
        watchouts: data.watchouts || "",
        communicationTips: data.communication_tips || "",
        motivators: data.motivators || [],
        demotivators: data.demotivators || [],
        evidenceQuotes: data.evidence_quotes || [],
        sourceDocUrl: data.source_doc_url || "",
        sourceProvenance: data.source_provenance || "",
        createdAt: now,
        updatedAt: now,
      });

      return profileId;
    } catch (error) {
      console.error("Error creating employee profile:", error);
      throw new Error(`Failed to create employee profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});

/**
 * Get all employee profiles
 */
export const getAllEmployeeProfiles = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("employeeProfiles"),
    _creationTime: v.number(),
    employeeId: v.string(),
    name: v.string(),
    position: v.optional(v.string()),
    organization: v.optional(v.string()),
    reportsTo: v.optional(v.string()),
    gender: v.optional(v.string()),
    assessmentDate: v.string(),
    all34: v.array(v.string()),
    leadDomain: v.string(),
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
  })),
  handler: async (ctx, args) => {
    const profiles = await ctx.db
      .query("employeeProfiles")
      .order("desc")
      .collect();

    return profiles;
  },
});

/**
 * Get a specific employee profile by ID
 */
export const getEmployeeProfile = query({
  args: {
    employeeId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("employeeProfiles"),
      _creationTime: v.number(),
      employeeId: v.string(),
      name: v.string(),
      position: v.optional(v.string()),
      organization: v.optional(v.string()),
      reportsTo: v.optional(v.string()),
      gender: v.optional(v.string()),
      assessmentDate: v.string(),
      all34: v.array(v.string()),
      leadDomain: v.string(),
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
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("employeeProfiles")
      .withIndex("by_employee_id", (q) => q.eq("employeeId", args.employeeId))
      .first();

    return profile || null;
  },
});

/**
 * Delete an employee profile
 */
export const deleteEmployeeProfile = mutation({
  args: {
    profileId: v.id("employeeProfiles"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.profileId);
    return null;
  },
});

/**
 * Update an employee profile
 */
export const updateEmployeeProfile = mutation({
  args: {
    profileId: v.id("employeeProfiles"),
    profileData: v.string(), // JSON string to parse
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    try {
      const data = JSON.parse(args.profileData);
      const now = Date.now();

      await ctx.db.patch(args.profileId, {
        employeeId: data.employee_id,
        name: data.name,
        position: data.position || undefined,
        organization: data.organization || undefined,
        reportsTo: data.reports_to || undefined,
        gender: data.gender || undefined,
        assessmentDate: data.assessment_date || "",
        all34: data.all34 || [],
        leadDomain: data.lead_domain || "",
        themeDomains: {
          Executing: data.theme_domains?.Executing || [],
          Influencing: data.theme_domains?.Influencing || [],
          RelationshipBuilding: data.theme_domains?.["Relationship Building"] || [],
          StrategyThinking: data.theme_domains?.["Strategic Thinking"] || [],
        },
        howToCoach: data.how_to_coach || "",
        bestCollabWith: data.best_collab_with || "",
        watchouts: data.watchouts || "",
        communicationTips: data.communication_tips || "",
        motivators: data.motivators || [],
        demotivators: data.demotivators || [],
        evidenceQuotes: data.evidence_quotes || [],
        sourceDocUrl: data.source_doc_url || "",
        sourceProvenance: data.source_provenance || "",
        updatedAt: now,
      });

      return null;
    } catch (error) {
      console.error("Error updating employee profile:", error);
      throw new Error(`Failed to update employee profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
});

/**
 * Internal query to get employee profile for RAG operations
 */
export const getEmployeeProfileInternal = internalQuery({
  args: {
    profileId: v.id("employeeProfiles"),
  },
  returns: v.union(
    v.object({
      _id: v.id("employeeProfiles"),
      _creationTime: v.number(),
      employeeId: v.string(),
      name: v.string(),
      position: v.optional(v.string()),
      organization: v.optional(v.string()),
      reportsTo: v.optional(v.string()),
      gender: v.optional(v.string()),
      assessmentDate: v.string(),
      all34: v.array(v.string()),
      leadDomain: v.string(),
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
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.profileId);
  },
});
