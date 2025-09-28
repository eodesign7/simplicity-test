// Core types for React components
export interface LayoutProps {
  children: React.ReactNode;
}

export interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

import type { Id } from "../../convex/_generated/dataModel";

export type AnnouncementData = {
  _id: Id<"announcements">;
  _creationTime: number;
  title: string;
  publishedAt?: string;
  lastUpdate: string;
  categories: string[] | string; // Support both during migration
  status: boolean;
};

export type DataTableProps = {
  preloadedData?: any;
};

export type AnnouncementActions = {
  onDelete: (id: Id<"announcements">) => Promise<void>;
  onToggleStatus: (
    id: Id<"announcements">,
    currentStatus: boolean
  ) => Promise<void>;
};
