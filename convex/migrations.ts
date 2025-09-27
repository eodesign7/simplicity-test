import { internalMutation } from "./_generated/server";

// Migration to convert categories from string to array
export const migrateCategoriesStringToArray = internalMutation({
  args: {},
  handler: async (ctx) => {
    const announcements = await ctx.db.query("announcements").collect();

    let updated = 0;
    for (const announcement of announcements) {
      // Check if categories is a string (old format)
      if (typeof announcement.categories === "string") {
        await ctx.db.patch(announcement._id, {
          categories: [announcement.categories as any],
          publishedAt: announcement.publishedAt || undefined,
        });
        updated++;
      }
    }

    return { updated, total: announcements.length };
  },
});

// Migration to add missing fields to old records
export const addMissingFields = internalMutation({
  args: {},
  handler: async (ctx) => {
    const announcements = await ctx.db.query("announcements").collect();

    let updated = 0;
    for (const announcement of announcements) {
      const updates: any = {};

      // Ensure categories is array
      if (typeof announcement.categories === "string") {
        updates.categories = [announcement.categories as any];
      }

      // Set publishedAt for published records that don't have it
      if (announcement.status && !announcement.publishedAt) {
        // Use publicationDate if available, otherwise use _creationTime
        const fallbackTime = (announcement as any).publicationDate
          ? new Date((announcement as any).publicationDate).toISOString()
          : new Date(announcement._creationTime).toISOString();
        updates.publishedAt = fallbackTime;
      }

      // Set publishedAt for scheduled records
      if (
        !announcement.status &&
        !announcement.publishedAt &&
        (announcement as any).publicationDate
      ) {
        updates.publishedAt = new Date(
          (announcement as any).publicationDate
        ).toISOString();
      }

      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(announcement._id, updates);
        updated++;
      }
    }

    return { updated, total: announcements.length };
  },
});
