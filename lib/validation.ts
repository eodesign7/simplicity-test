import { z } from "zod";

// Base announcement schema
export const baseAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

// Create announcement schema (requires publish date/time)
export const createAnnouncementSchema = baseAnnouncementSchema.extend({
  publishDate: z.string().min(1, "Publish date is required"),
  publishTime: z.string().min(1, "Publish time is required"),
  status: z.boolean().optional(),
});

// Update announcement schema (publish date/time conditional)
export const updateAnnouncementSchema = baseAnnouncementSchema.extend({
  publishDate: z.string().optional(),
  publishTime: z.string().optional(),
  status: z.boolean().optional(),
});

// Conditional validation for update form
export const validateUpdateForm = (
  data: any,
  isPublished: boolean,
  willPublish: boolean
) => {
  const baseErrors = validateSchema(baseAnnouncementSchema, data);

  // Only require publish date/time for unpublished announcements that aren't being published immediately
  if (!isPublished && !willPublish) {
    if (!data.publishDate) {
      baseErrors.publishDate = "Publish date is required";
    }
    if (!data.publishTime) {
      baseErrors.publishTime = "Publish time is required";
    }
  }

  return baseErrors;
};

// Generic schema validation helper
export const validateSchema = <T>(
  schema: z.ZodSchema<T>,
  data: any
): Record<string, string> => {
  const result = schema.safeParse(data);
  const errors: Record<string, string> = {};

  if (!result.success) {
    result.error.errors.forEach((error) => {
      const path = error.path.join(".");
      errors[path] = error.message;
    });
  }

  return errors;
};

// Type exports
export type CreateAnnouncementFormData = z.infer<
  typeof createAnnouncementSchema
>;
export type UpdateAnnouncementFormData = z.infer<
  typeof updateAnnouncementSchema
>;
export type BaseAnnouncementFormData = z.infer<typeof baseAnnouncementSchema>;

// Legacy export for backwards compatibility
export const announcementSchema = createAnnouncementSchema;
export type AnnouncementFormData = CreateAnnouncementFormData;

// Date format validation (MM/DD/YYYY HH:mm)
export const dateFormatRegex =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})\s([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const validateDateFormat = (dateString: string): boolean => {
  return dateFormatRegex.test(dateString);
};
