import type { Announcement } from "../types";
import { mockAnnouncements as initialMockData } from "./mock-data";

const STORAGE_KEY = "announcements-data";

// Load data from localStorage or fallback to mock data
export function loadAnnouncements(): Announcement[] {
  // Check if we're in browser environment
  if (typeof window === "undefined") {
    return initialMockData;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    // If localStorage is empty, load from mock data and save it
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockData));
    return initialMockData;
  } catch (error) {
    console.error("Error loading announcements from localStorage:", error);
    return initialMockData;
  }
}

// Save announcements to localStorage
export function saveAnnouncements(announcements: Announcement[]): void {
  // Check if we're in browser environment
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
  } catch (error) {
    console.error("Error saving announcements to localStorage:", error);
  }
}

// Get announcement by ID
export function getAnnouncementById(id: string): Announcement | undefined {
  const announcements = loadAnnouncements();
  return announcements.find((announcement) => announcement.id === id);
}

// Create new announcement
export function createAnnouncement(
  newAnnouncement: Omit<Announcement, "id" | "link">
): Announcement {
  const announcements = loadAnnouncements();
  const id = (announcements.length + 1).toString();
  const link = `/announcements/${id}`;

  const announcement: Announcement = {
    ...newAnnouncement,
    id,
    link,
  };

  // Add to beginning of array and save
  announcements.unshift(announcement);
  saveAnnouncements(announcements);

  return announcement;
}

// Update announcement (for future use if needed)
export function updateAnnouncement(
  id: string,
  updatedAnnouncement: Partial<Announcement>
): void {
  const announcements = loadAnnouncements();
  const index = announcements.findIndex(
    (announcement) => announcement.id === id
  );

  if (index !== -1) {
    announcements[index] = {
      ...announcements[index],
      ...updatedAnnouncement,
    };
    saveAnnouncements(announcements);
  }
}
