import * as React from "react";
import { useQuery, usePreloadedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DataTableCore } from "./data-table/data-table-core";
import type { AnnouncementData } from "../../types.d.ts";

export function DataTable() {
  const announcements = useQuery(api.announcements.getAll);

  // Transform Convex data to match our AnnouncementData type
  const data = React.useMemo((): AnnouncementData[] => {
    if (!announcements) return [];
    return announcements.map((item: any) => ({
      _id: item._id,
      title: item.title,
      _creationTime: item._creationTime,
      publishedAt: item.publishedAt,
      lastUpdate: item.lastUpdate,
      categories: item.categories,
      status: item.status,
    }));
  }, [announcements]);

  if (!announcements) {
    return (
      <div className="w-full space-y-4 p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 h-8 w-8" />
          <div className="text-sm text-muted-foreground">
            Loading announcements...
          </div>
        </div>
      </div>
    );
  }

  return <DataTableCore data={data} />;
}

// Enhanced version with preloadedQuery for better performance
export function DataTableWithPreload({
  preloadedData,
}: {
  preloadedData: any;
}) {
  const announcements = usePreloadedQuery(preloadedData);

  // Transform Convex data to match our AnnouncementData type
  const data = React.useMemo((): AnnouncementData[] => {
    if (!announcements) return [];
    return announcements.map((item: any) => ({
      _id: item._id,
      title: item.title,
      _creationTime: item._creationTime,
      publishedAt: item.publishedAt,
      lastUpdate: item.lastUpdate,
      categories: item.categories,
      status: item.status,
    }));
  }, [announcements]);

  return <DataTableCore data={data} />;
}
