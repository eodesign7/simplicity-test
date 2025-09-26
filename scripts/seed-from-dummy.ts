import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { mockAnnouncements } from "../dummy";
import fs from "node:fs";
import path from "node:path";
import { config, parse } from "dotenv";

// Load env: root .env.local -> root .env
config({ path: ".env.local" });
config({ path: ".env" });

// Load convex/.env.local then convex/.env if present
const convexEnvLocal = path.resolve("convex/.env.local");
const convexEnv = path.resolve("convex/.env");
if (fs.existsSync(convexEnvLocal))
  Object.assign(process.env, parse(fs.readFileSync(convexEnvLocal)));
if (fs.existsSync(convexEnv))
  Object.assign(process.env, parse(fs.readFileSync(convexEnv)));

// CLI args support: --url=..., --deployment=dev:animal-123
const arg = (name: string) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const urlFromArg = arg("url");
const deploymentFromArg = arg("deployment");

const fromDeployment = (dep?: string) => {
  if (!dep) return undefined;
  const id = dep.includes(":") ? dep.split(":")[1] : dep;
  return `https://${id}.convex.cloud`;
};

const convexUrl =
  urlFromArg ||
  process.env.VITE_CONVEX_URL ||
  process.env.CONVEX_URL ||
  fromDeployment(deploymentFromArg) ||
  fromDeployment(process.env.CONVEX_DEPLOYMENT);

if (!convexUrl) {
  console.error(
    "❌ Convex URL is not set. Pass --url=..., or set VITE_CONVEX_URL/CONVEX_URL, or CONVEX_DEPLOYMENT."
  );
  process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

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

function normalizeCategory(input: string | undefined): AllowedCategory {
  const normalized = (input ?? "city").trim().toLowerCase();
  const map: Record<string, AllowedCategory> = {
    city: "city",
    "community events": "community events",
    "crime & safety": "crime & safety",
    culture: "culture",
    "discounts & benefits": "discounts & benefits",
    emergencies: "emergencies",
    "for seniors": "fo seniors",
    "fo seniors": "fo seniors",
    health: "health",
    "kids & family": "kids & family",
  };
  return map[normalized] ?? "city";
}

async function run() {
  console.log("🌱 Seeding from dummy.ts ...");
  console.log("→ Using Convex URL:", convexUrl);

  const items = mockAnnouncements.map((a) => ({
    title: a.title,
    content: a.content,
    categories: normalizeCategory(a.categories[0]),
    publicationDate: a.publicationDate,
    lastUpdate: a.lastUpdate,
    status: true,
  }));

  let ok = 0;
  let fail = 0;

  for (const [idx, item] of items.entries()) {
    try {
      await client.mutation(api.announcements.create, item);
      ok += 1;
      if ((idx + 1) % 5 === 0)
        console.log(`... created ${idx + 1}/${items.length}`);
    } catch (e) {
      fail += 1;
      console.error("❌ Failed:", item.title, e);
    }
  }

  console.log(`✅ Done. Success: ${ok}, Failed: ${fail}`);
}

// Always run when executed (tsx may not satisfy import.meta.url check reliably)
run()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

export {};
