import * as React from "react";
import { Link } from "react-router";
import { Edit, MoreHorizontal, Trash2, Eye, EyeOff, Timer } from "lucide-react";
import type { ColumnDef, Row } from "@tanstack/react-table";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { formatDateTimeForDisplay } from "../../../lib/datetime-utils";
import type {
  AnnouncementData,
  AnnouncementActions,
} from "../../../types.d.ts";

export function createColumns(
  actions: AnnouncementActions
): ColumnDef<AnnouncementData>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }: { row: Row<AnnouncementData> }) => (
        <div className="font-bold">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "_creationTime",
      header: "Created",
      cell: ({ row }: { row: Row<AnnouncementData> }) => (
        <div className="text-sm">
          {new Date(row.getValue("_creationTime")).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "publishedAt",
      header: "Published",
      cell: ({ row }: { row: Row<AnnouncementData> }) => {
        const publishedAt = row.getValue("publishedAt") as string | undefined;
        const status = row.getValue("status") as boolean;
        const creationTime = row.getValue("_creationTime") as number;

        if (status) {
          // If published, show publishedAt or fallback to creationTime
          const displayTime = publishedAt
            ? formatDateTimeForDisplay(publishedAt)
            : formatDateTimeForDisplay(new Date(creationTime));
          return <div className="text-sm text-green-600">{displayTime}</div>;
        } else {
          // If not published but scheduled
          return (
            <div className="text-sm text-amber-500 flex items-center gap-1">
              {publishedAt ? (
                <>
                  <Timer className="h-3 w-3" />
                  {formatDateTimeForDisplay(publishedAt)}
                </>
              ) : (
                "Not scheduled"
              )}
            </div>
          );
        }
      },
    },
    {
      accessorKey: "categories",
      header: "Categories",
      cell: ({ row }: { row: Row<AnnouncementData> }) => {
        const categoriesRaw = row.getValue("categories");
        const categories = Array.isArray(categoriesRaw)
          ? categoriesRaw
          : typeof categoriesRaw === "string"
          ? [categoriesRaw]
          : [];
        return (
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {categories.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{categories.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: Row<AnnouncementData> }) => {
        const status = row.getValue("status") as boolean;
        const publishedAt = row.getValue("publishedAt") as string | undefined;

        if (status) {
          return (
            <Badge className="bg-green-100 text-green-800">Published</Badge>
          );
        } else if (publishedAt) {
          return (
            <Badge className="bg-amber-100 text-amber-800">Scheduled</Badge>
          );
        } else {
          return (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              Private
            </Badge>
          );
        }
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<AnnouncementData> }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                to={`/announcements/${row.original._id}`}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                actions.onToggleStatus(row.original._id, row.original.status)
              }
              className="flex items-center gap-2"
            >
              {row.original.status === true ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Unpublish
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Publish
                </>
              )}
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the announcement "{row.original.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => actions.onDelete(row.original._id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
