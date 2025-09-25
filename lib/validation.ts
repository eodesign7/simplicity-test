import { z } from "zod";

// Announcement form validation schema
export const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  publicationDate: z.string().min(1, "Publication date is required"),
});

export type AnnouncementFormData = z.infer<typeof announcementSchema>;

// Date format validation (MM/DD/YYYY HH:mm)
export const dateFormatRegex =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})\s([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const validateDateFormat = (dateString: string): boolean => {
  return dateFormatRegex.test(dateString);
};
