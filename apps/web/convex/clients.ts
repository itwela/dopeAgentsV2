import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new client
export const createClient = mutation({
  args: {
    userId: v.string(),
    userName: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const clientId = `client-${now}-${Math.random().toString(36).substring(2, 9)}`;
    
    return await ctx.db.insert("clients", {
      clientId,
      userId: args.userId,
      userName: args.userName,
      name: args.name,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get all clients for a user
export const getUserClients = query({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_user_name", (q) => q.eq("userName", args.userName))
      .order("desc")
      .collect();
  },
});

// Get all clients
export const getAllClients = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("clients")
      .order("desc")
      .collect();
  },
});

// Get a specific client by ID
export const getClient = query({
  args: {
    clientId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_client_id", (q) => q.eq("clientId", args.clientId))
      .first();
  },
});

// Get a specific client by name
export const getClientByName = query({
  args: {
    name: v.string(),
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const clients = await ctx.db
      .query("clients")
      .withIndex("by_user_name", (q) => q.eq("userName", args.userName))
      .collect();
    
    return clients.find(client => client.name === args.name);
  },
});

// Update a client
export const updateClient = mutation({
  args: {
    clientId: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { clientId, ...updates } = args;
    
    const client = await ctx.db
      .query("clients")
      .withIndex("by_client_id", (q) => q.eq("clientId", clientId))
      .first();
    
    if (!client) {
      throw new Error("Client not found");
    }
    
    return await ctx.db.patch(client._id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete a client
export const deleteClient = mutation({
  args: {
    clientId: v.string(),
  },
  handler: async (ctx, args) => {
    const client = await ctx.db
      .query("clients")
      .withIndex("by_client_id", (q) => q.eq("clientId", args.clientId))
      .first();
    
    if (!client) {
      throw new Error("Client not found");
    }
    
    return await ctx.db.delete(client._id);
  },
});
