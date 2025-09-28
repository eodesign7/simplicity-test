import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export function useAnnouncementActions() {
  const deleteAnnouncement = useMutation(api.announcements.deleteAnnouncement);
  const updateAnnouncement = useMutation(api.announcements.update);

  const handleDelete = async (id: Id<"announcements">) => {
    try {
      await deleteAnnouncement({ id: id as Id<"announcements"> });
      toast.success("Announcement deleted successfully");
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      toast.error("Failed to delete announcement. Please try again.");
    }
  };

  const handleToggleStatus = async (
    id: Id<"announcements">,
    currentStatus: boolean
  ) => {
    try {
      const now = new Date().toISOString();
      const updateData: any = {
        id: id as Id<"announcements">,
        status: !currentStatus,
        lastUpdate: now,
      };

      // If we're publishing (changing from false to true), set publishedAt to now
      if (!currentStatus) {
        updateData.publishedAt = now;
      }

      await updateAnnouncement(updateData);
      toast.success(
        `Announcement ${
          !currentStatus ? "published" : "unpublished"
        } successfully`
      );
    } catch (error) {
      console.error("Failed to update announcement status:", error);
      toast.error("Failed to update announcement status. Please try again.");
    }
  };

  return {
    handleDelete,
    handleToggleStatus,
  };
}
