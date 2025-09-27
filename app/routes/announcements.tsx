import type { Route } from "./+types/announcements";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Layout } from "../components/main-layout";
import { DataTableWithPreload } from "@/components/data-table";

// Create Convex client for preloading
const convex = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL!);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Announcements" },
    {
      name: "description",
      content: "Announcements list page",
    },
  ];
}

// Preload data in the loader
export async function loader(): Promise<{ preloadedAnnouncements: any }> {
  const announcements = await convex.query(api.announcements.getAll);
  return {
    preloadedAnnouncements: {
      _valueJSON: announcements,
      _argsJSON: {},
      _name: "announcements:getAll",
    },
  };
}

export default function Announcements({ loaderData }: Route.ComponentProps) {
  return (
    <Layout>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col gap-4">
            <DataTableWithPreload
              preloadedData={loaderData.preloadedAnnouncements}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
