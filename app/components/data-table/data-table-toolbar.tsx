import type { Table } from "@tanstack/react-table";

import { Input } from "../ui/input";
import { TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CreateAnnouncementDialog } from "../CreateAnnouncementDialog";
import type { AnnouncementData } from "../../../types.d.ts";

interface DataTableToolbarProps {
  table: Table<AnnouncementData>;
  activeTab: string;
  onTabChange: (value: string) => void;
  sorting: any[];
  onSortingChange: (sorting: any[]) => void;
}

export function DataTableToolbar({
  table,
  activeTab,
  onTabChange,
  sorting,
  onSortingChange,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center space-x-2 flex-1">
        <Input
          placeholder="Search..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 flex-1"
        />
      </div>

      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
      </TabsList>

      <div className="flex items-center space-x-2">
        <Select
          value={sorting.length > 0 ? sorting[0].id : "_creationTime"}
          onValueChange={(value) => {
            if (value === "_creationTime") {
              onSortingChange([{ id: "_creationTime", desc: true }]);
            } else if (value === "publishedAt") {
              onSortingChange([{ id: "publishedAt", desc: true }]);
            } else if (value === "lastUpdate") {
              onSortingChange([{ id: "lastUpdate", desc: true }]);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_creationTime">Created Date</SelectItem>
            <SelectItem value="publishedAt">Published Date</SelectItem>
            <SelectItem value="lastUpdate">Last Update</SelectItem>
          </SelectContent>
        </Select>

        <CreateAnnouncementDialog />
      </div>
    </div>
  );
}
