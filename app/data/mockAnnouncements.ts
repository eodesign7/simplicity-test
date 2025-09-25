// Mock data store pre announcements
export interface Announcement {
  id: number;
  title: string;
  content: string;
  categories: string[];
  publicationDate: string;
  lastUpdate: string;
}

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Obrazok contest 3",
    content: "dasda",
    categories: ["City", "Community events"],
    publicationDate: "08/10/2023 08:55",
    lastUpdate: "Aug 11, 2023",
  },
  {
    id: 2,
    title: "Title 2",
    content: "Content for title 2",
    categories: ["City"],
    publicationDate: "Aug 11, 2023 04:36",
    lastUpdate: "Aug 11, 2023",
  },
  {
    id: 3,
    title: "Title 3",
    content: "Content for title 3",
    categories: ["City"],
    publicationDate: "Aug 11, 2023 04:35",
    lastUpdate: "Aug 11, 2023",
  },
  {
    id: 4,
    title: "Title 4",
    content: "Content for title 4",
    categories: ["City"],
    publicationDate: "Apr 19, 2023 05:14",
    lastUpdate: "Apr 19, 2023",
  },
  {
    id: 5,
    title: "Title 5",
    content: "Content for title 5",
    categories: ["City"],
    publicationDate: "Apr 19, 2023 05:11",
    lastUpdate: "Apr 19, 2023",
  },
  {
    id: 6,
    title: "Title 6",
    content: "Content for title 6",
    categories: ["City"],
    publicationDate: "Apr 19, 2023 05:11",
    lastUpdate: "Apr 19, 2023",
  },
  {
    id: 7,
    title: "Title 7",
    content: "Content for title 7",
    categories: ["City", "Health"],
    publicationDate: "Mar 24, 2023 07:27",
    lastUpdate: "Mar 24, 2023",
  },
  {
    id: 8,
    title: "Title 8",
    content: "Content for title 8",
    categories: ["City", "Health"],
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
  },
  {
    id: 9,
    title: "Title 9",
    content: "Content for title 9",
    categories: ["City", "Health"],
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
  },
  {
    id: 10,
    title: "Title 10",
    content: "Content for title 10",
    categories: ["City", "Health"],
    publicationDate: "Mar 24, 2023 07:26",
    lastUpdate: "Mar 24, 2023",
  },
];

// Available categories
export const availableCategories = [
  "City",
  "Community events",
  "Crime & Safety",
  "Culture",
  "Discounts & Benefits",
  "Emergencies",
  "For Seniors",
  "Health",
  "Kids & Family",
];

// Functions to manage announcements
export function getAnnouncementById(id: number): Announcement | undefined {
  return mockAnnouncements.find((announcement) => announcement.id === id);
}

export function updateAnnouncement(
  id: number,
  updatedAnnouncement: Partial<Announcement>
): void {
  const index = mockAnnouncements.findIndex(
    (announcement) => announcement.id === id
  );
  if (index !== -1) {
    mockAnnouncements[index] = {
      ...mockAnnouncements[index],
      ...updatedAnnouncement,
    };
  }
}
