export interface Announcement {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  lastUpdate: string;
  categories: string[];
  link: string;
}

export interface AnnouncementFormData {
  title: string;
  content: string;
  categories: string[];
  publicationDate: string;
}

// Form validation schema types
export interface AnnouncementFormErrors {
  title?: string;
  content?: string;
  categories?: string;
  publicationDate?: string;
}

// Component props types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface AnnouncementTableProps {
  announcements?: Announcement[];
}

export interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export interface CategoryDropdownProps {
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  error?: string;
}

// Storage types
export interface StorageFunctions {
  loadAnnouncements: () => Announcement[];
  saveAnnouncements: (announcements: Announcement[]) => void;
  getAnnouncementById: (id: string) => Announcement | undefined;
  createAnnouncement: (data: Omit<Announcement, "id" | "link">) => Announcement;
  updateAnnouncement: (id: string, data: Partial<Announcement>) => void;
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
