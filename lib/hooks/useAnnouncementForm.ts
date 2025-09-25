import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { announcementSchema } from "../validation";
import type { AnnouncementFormData } from "../../types";
import { getAnnouncementById, createAnnouncement } from "../storage";
import { availableCategories } from "../mock-data";

export function useAnnouncementForm(id?: string) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isNewAnnouncement = !id || id === "new";
  const announcement = id ? getAnnouncementById(id) : null;

  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: announcement?.title || "",
      content: announcement?.content || "",
      categories: announcement?.categories || [],
      publicationDate:
        announcement?.publicationDate ||
        new Date()
          .toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(/(\d+)\/(\d+)\/(\d+),?\s*(\d+):(\d+)/, "$1/$2/$3 $4:$5"),
    },
  });

  const watchedCategories = form.watch("categories");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCategory = (category: string) => {
    const currentCategories = watchedCategories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];

    form.setValue("categories", newCategories);
  };

  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      // Vždy vytvorí NOVÝ záznam (podľa zadania)
      createAnnouncement({
        title: data.title,
        content: data.content,
        categories: data.categories,
        publicationDate: data.publicationDate,
        lastUpdate: currentDate,
      });

      toast.success("Announcement published successfully!");
      navigate("/announcements");
    } catch (error) {
      toast.error("Failed to publish announcement");
    }
  };

  return {
    form,
    isNewAnnouncement,
    announcement,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownRef,
    watchedCategories,
    toggleCategory,
    onSubmit,
    availableCategories,
  };
}
