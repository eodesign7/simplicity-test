import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  announcements: defineTable({
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
  }),
});
