import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { mockAnnouncements } from "../dummy";
import { config } from "dotenv";

// Load environment variables: root .env.local -> root .env -> convex/.env.local -> convex/.env
config({ path: ".env.local" });
config({ path: ".env" });
config({ path: "convex/.env.local" });
config({ path: "convex/.env" });

// Debug: show what we loaded
console.log("🔍 Environment check:");
console.log("VITE_CONVEX_URL:", process.env.VITE_CONVEX_URL);

// Check for CONVEX_URL
const convexUrl = process.env.VITE_CONVEX_URL!;
if (!convexUrl) {
  console.error("❌ VITE_CONVEX_URL environment variable is not set!");
  console.log("💡 Set it in convex/.env.local or .env.local, e.g.:");
  console.log("   VITE_CONVEX_URL='https://your-deployment.convex.cloud'");
  process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

// Allowed category values per Convex schema
type AllowedCategory =
  | "city"
  | "community events"
  | "crime & safety"
  | "culture"
  | "discounts & benefits"
  | "emergencies"
  | "fo seniors"
  | "health"
  | "kids & family";

function normalizeCategory(input: string): AllowedCategory {
  const normalized = input.trim().toLowerCase();
  const map: Record<string, AllowedCategory> = {
    city: "city",
    "community events": "community events",
    "crime & safety": "crime & safety",
    culture: "culture",
    "discounts & benefits": "discounts & benefits",
    emergencies: "emergencies",
    "for seniors": "fo seniors", // source uses "For Seniors"
    "fo seniors": "fo seniors",
    health: "health",
    "kids & family": "kids & family",
  };
  return map[normalized] ?? "city";
}

async function seedAnnouncements() {
  console.log("🌱 Starting to seed announcements...");

  try {
    // Transform dummy data to match Convex schema
    const transformedData = mockAnnouncements.map((announcement) => ({
      title: announcement.title,
      content: announcement.content,
      categories: normalizeCategory(announcement.categories[0] ?? "city"),
      publicationDate: announcement.publicationDate,
      lastUpdate: announcement.lastUpdate,
      status: true,
    }));

    console.log(`📝 Processing ${transformedData.length} announcements...`);

    // Seed in small concurrent batches
    const concurrency = 5;
    const results: string[] = [];
    let success = 0;
    let failed = 0;

    for (let i = 0; i < transformedData.length; i += concurrency) {
      const slice = transformedData.slice(i, i + concurrency);
      const settled = await Promise.allSettled(
        slice.map((announcement) =>
          client.mutation(api.announcements.create, announcement)
        )
      );

      for (const r of settled) {
        if (r.status === "fulfilled") {
          results.push(String(r.value));
          success += 1;
        } else {
          failed += 1;
          console.error("❌ Failed to create record:", r.reason);
        }
      }
    }

    console.log(`✅ Successfully created ${success} announcements`);
    if (failed > 0) console.log(`⚠️ Failed: ${failed}`);
    console.log("🎉 Seeding completed!");

    return results;
  } catch (error) {
    console.error("❌ Error seeding announcements:", error);
    throw error;
  }
}

// Run the seeding if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedAnnouncements()
    .then(() => {
      console.log("🚀 Seeding script finished successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding script failed:", error);
      process.exit(1);
    });
}

export { seedAnnouncements };
