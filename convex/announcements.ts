import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

const categoryType = v.union(
  v.literal("city"),
  v.literal("community events"),
  v.literal("crime & safety"),
  v.literal("culture"),
  v.literal("discounts & benefits"),
  v.literal("emergencies"),
  v.literal("for seniors"),
  v.literal("health"),
  v.literal("kids & family")
);

const args = v.object({
  title: v.string(),
  content: v.string(),
  categories: v.array(categoryType),
  createdAt: v.string(),
  publishedAt: v.optional(v.string()),
  lastUpdate: v.string(),
  status: v.boolean(),
});

// Create a new announcement
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    categories: v.union(v.array(categoryType), categoryType),
    publishedAt: v.optional(v.string()),
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
    const announcements = await ctx.db
      .query("announcements")
      .order("desc")
      .collect();
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
    categories: v.optional(v.union(v.array(categoryType), categoryType)),
    publishedAt: v.optional(v.string()),
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

// Auto-publish scheduled announcements (called by cron job)
export const autoPublishScheduled = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = new Date().toISOString();

    // Find announcements that should be published now
    const announcements = await ctx.db
      .query("announcements")
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), false), // not published yet
          q.neq(q.field("publishedAt"), undefined), // has scheduled time
          q.lte(q.field("publishedAt"), now) // scheduled time has passed
        )
      )
      .collect();

    // Update them to published status
    for (const announcement of announcements) {
      await ctx.db.patch(announcement._id, {
        status: true,
        lastUpdate: now,
      });
    }

    return { published: announcements.length };
  },
});
