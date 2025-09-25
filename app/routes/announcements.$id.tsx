import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import type { Route } from "./+types/announcements.$id";
import { Layout } from "../components/Layout";
import {
  getAnnouncementById,
  updateAnnouncement,
  availableCategories,
} from "../data/mockAnnouncements";

// Zod validation schema
const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  publicationDate: z.string().min(1, "Publication date is required"),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Announcement" },
    {
      name: "description",
      content: "Edit announcement page",
    },
  ];
}

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(
    getAnnouncementById(Number(id))
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: announcement?.title || "",
      content: announcement?.content || "",
      categories: announcement?.categories || [],
      publicationDate: announcement?.publicationDate || "",
    },
  });

  const watchedCategories = watch("categories");

  useEffect(() => {
    if (announcement) {
      setValue("title", announcement.title);
      setValue("content", announcement.content);
      setValue("categories", announcement.categories);
      setValue("publicationDate", announcement.publicationDate);
    }
  }, [announcement, setValue]);

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

    setValue("categories", newCategories);
  };

  const onSubmit = async (data: AnnouncementFormData) => {
    try {
      if (announcement) {
        updateAnnouncement(announcement.id, {
          ...data,
          lastUpdate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        });

        toast.success("Announcement updated successfully!");
        navigate("/announcements");
      }
    } catch (error) {
      toast.error("Failed to update announcement");
    }
  };

  if (!announcement) {
    return (
      <Layout>
        <div className="bg-white p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">
            Announcement not found
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-6 w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-900 mb-8">
          Edit the announcement
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-neutral-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-600 text-neutral-600"
              placeholder="Enter announcement title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-bold text-neutral-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              rows={4}
              {...register("content")}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-600 text-neutral-600"
              placeholder="Enter announcement content"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-2">
              Category
            </label>
            <p className="text-sm text-neutral-500 mb-4">
              Select category so readers know what your announcement is about.
            </p>
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white min-h-[40px] flex items-center flex-wrap gap-2 cursor-pointer placeholder:text-neutral-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {watchedCategories && watchedCategories.length > 0 ? (
                  watchedCategories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-200 text-neutral-600 rounded text-sm"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category);
                        }}
                        className="ml-2 text-neutral-800 hover:text-neutral-900 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-600">Select categories...</span>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className={`w-4 h-4 text-neutral-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown list */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-48 overflow-y-scroll scrollbar-hide z-10">
                  {availableCategories
                    .filter((cat) => !watchedCategories?.includes(cat))
                    .map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          toggleCategory(category);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-neutral-600 hover:bg-gray-50"
                      >
                        {category}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {errors.categories && (
              <p className="mt-1 text-sm text-red-600">
                {errors.categories.message}
              </p>
            )}
          </div>

          {/* Publication Date */}
          <div>
            <label
              htmlFor="publicationDate"
              className="block text-sm font-bold text-neutral-700 mb-6"
            >
              Publication date
            </label>
            <input
              id="publicationDate"
              type="text"
              {...register("publicationDate")}
              placeholder="MM/DD/YYYY HH:mm"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-600 text-neutral-600"
            />
            {errors.publicationDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.publicationDate.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-neutral-900 px-6 py-2 rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
