import { useState, useEffect } from "react";
import type { Announcement } from "../../types";
import { loadAnnouncements } from "../storage";

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to show skeleton
    const loadData = async () => {
      setIsLoading(true);

      // Small delay to ensure smooth loading
      await new Promise((resolve) => setTimeout(resolve, 300));

      const data = loadAnnouncements();
      setAnnouncements(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const refreshAnnouncements = () => {
    const data = loadAnnouncements();
    setAnnouncements(data);
  };

  return {
    announcements,
    isLoading,
    refreshAnnouncements,
  };
}
