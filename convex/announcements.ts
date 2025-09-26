import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const args = v.object({
  title: v.string(),
  content: v.string(),
  categories: v.union(
    v.literal("city"),
    v.literal("community events"),
    v.literal("crime & safety"),
    v.literal("culture"),
    v.literal("discounts & benefits"),
    v.literal("emergencies"),
    v.literal("fo seniors"),
    v.literal("health"),
    v.literal("kids & family")
  ),
  publicationDate: v.string(),
  lastUpdate: v.string(),
  status: v.boolean(),
});

// Create a new announcement
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    categories: v.union(
      v.literal("city"),
      v.literal("community events"),
      v.literal("crime & safety"),
      v.literal("culture"),
      v.literal("discounts & benefits"),
      v.literal("emergencies"),
      v.literal("fo seniors"),
      v.literal("health"),
      v.literal("kids & family")
    ),
    publicationDate: v.string(),
    lastUpdate: v.string(),
    status: v.boolean(),
  },
  handler: async (ctx, args) => {
    const announcement = await ctx.db.insert("announcements", args);
    return announcement;
  },
});

// Get all announcements
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const announcements = await ctx.db.query("announcements").collect();
    return announcements;
  },
});

// Get an announcement by id
export const getById = query({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    const announcement = await ctx.db.get(args.id);
    return announcement;
  },
});

// Update an announcement
export const update = mutation({
  args: {
    id: v.id("announcements"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    categories: v.optional(
      v.union(
        v.literal("city"),
        v.literal("community events"),
        v.literal("crime & safety"),
        v.literal("culture"),
        v.literal("discounts & benefits"),
        v.literal("emergencies"),
        v.literal("fo seniors"),
        v.literal("health"),
        v.literal("kids & family")
      )
    ),
    publicationDate: v.optional(v.string()),
    lastUpdate: v.optional(v.string()),
    status: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    const announcement = await ctx.db.get(id);
    if (!announcement) {
      throw new Error("Announcement not found");
    }
    await ctx.db.patch(id, updateData);
    return await ctx.db.get(id);
  },
});

// Delete an announcement
export const deleteAnnouncement = mutation({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    const announcement = await ctx.db.get(args.id);
    if (!announcement) {
      throw new Error("Announcement not found");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
