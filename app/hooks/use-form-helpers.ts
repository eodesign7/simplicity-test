import { combineDateAndTime } from "../../lib/datetime-utils";

export const createValidationData = (formData: any) => ({
  title: formData.title.trim(),
  content: formData.content.trim(),
  categories: formData.categories,
  publishDate: formData.publishDate,
  publishTime: formData.publishTime,
  status: formData.status,
});

export const createUpdateData = (formData: any, announcementId: string) => {
  const now = new Date().toISOString();
  const publishDateTime = combineDateAndTime(
    formData.publishDate,
    formData.publishTime
  );

  const updateData: any = {
    id: announcementId,
    title: formData.title.trim(),
    content: formData.content.trim(),
    categories: formData.categories,
    lastUpdate: now,
    status: formData.status,
  };

  // Handle publishedAt logic
  if (formData.status) {
    // If publishing immediately, set publishedAt to now
    updateData.publishedAt = now;
  } else {
    // If scheduling for later, use the scheduled time
    updateData.publishedAt = publishDateTime;
  }

  return updateData;
};

export const createNewAnnouncementData = (formData: any) => {
  const now = new Date().toISOString();
  const publishDateTime = combineDateAndTime(
    formData.publishDate,
    formData.publishTime
  );

  return {
    title: formData.title.trim(),
    content: formData.content.trim(),
    categories: formData.categories,
    lastUpdate: now,
    status: formData.status,
    publishedAt: formData.status ? now : publishDateTime,
  };
};
