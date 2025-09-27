import { useParams, useBlocker, useNavigate } from "react-router";
import {
  useQuery,
  useMutation,
  usePreloadedQuery,
  type Preloaded,
} from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Route } from "./+types/announcements.$id";
import type { Id } from "../../convex/_generated/dataModel";
import { Layout } from "../components/main-layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { FormField } from "../components/ui/FormField";
import { Badge } from "../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import {
  MultiSelect,
  type MultiSelectOption,
} from "../components/ui/multi-select";
import {
  generateTimeOptions,
  combineDateAndTime,
  parseDateTime,
  formatDateForInput,
} from "../../lib/datetime-utils";
import * as React from "react";

const categories: MultiSelectOption[] = [
  { value: "city", label: "City" },
  { value: "community events", label: "Community Events" },
  { value: "crime & safety", label: "Crime & Safety" },
  { value: "culture", label: "Culture" },
  { value: "discounts & benefits", label: "Discounts & Benefits" },
  { value: "emergencies", label: "Emergencies" },
  { value: "fo seniors", label: "For Seniors" },
  { value: "health", label: "Health" },
  { value: "kids & family", label: "Kids & Family" },
];

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
  const isNewAnnouncement = !id || id === "new";

  const updateAnnouncement = useMutation(api.announcements.update);

  const announcement = useQuery(
    api.announcements.getById,
    !isNewAnnouncement && id ? { id: id as Id<"announcements"> } : "skip"
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
    categories: [] as string[],
    publishDate: "",
    publishTime: "",
    status: false,
  });

  // Track original data and changes
  const [originalData, setOriginalData] = React.useState<
    typeof formData | null
  >(null);
  const [showDiscardDialog, setShowDiscardDialog] = React.useState(false);
  const [pendingNavigation, setPendingNavigation] = React.useState<
    string | null
  >(null);

  // Initialize form data when announcement loads
  React.useEffect(() => {
    if (announcement) {
      const { date, time } = announcement.publishedAt
        ? parseDateTime(announcement.publishedAt)
        : { date: "", time: "" };

      const initialData = {
        title: announcement.title || "",
        content: announcement.content || "",
        categories: Array.isArray(announcement.categories)
          ? announcement.categories
          : announcement.categories
          ? [announcement.categories as string]
          : [],
        publishDate: date,
        publishTime: time,
        status: announcement.status || false,
      };

      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [announcement]);

  // Check if form has unsaved changes
  const hasUnsavedChanges = React.useMemo(() => {
    if (!originalData) return false;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  }, [formData, originalData]);

  // Block navigation if there are unsaved changes
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (!hasUnsavedChanges) return false;
    if (currentLocation.pathname === nextLocation.pathname) return false;

    // Store where user wants to navigate
    setPendingNavigation(nextLocation.pathname);
    setShowDiscardDialog(true);
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewAnnouncement || !announcement) return;

    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (formData.categories.length === 0)
      newErrors.categories = "At least one category is required";
    if (!formData.publishDate)
      newErrors.publishDate = "Publish date is required";
    if (!formData.publishTime)
      newErrors.publishTime = "Publish time is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const now = new Date().toISOString();
      const publishDateTime = combineDateAndTime(
        formData.publishDate,
        formData.publishTime
      );

      const updateData: any = {
        id: announcement._id,
        title: formData.title.trim(),
        content: formData.content.trim(),
        categories: formData.categories as any,
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

      await updateAnnouncement(updateData);

      // Update original data to current form data (changes are saved)
      setOriginalData({ ...formData });

      // Navigate back or show success message
      alert("Announcement updated successfully!");
    } catch (error) {
      console.error("Failed to update announcement:", error);
      setErrors({ submit: "Failed to update announcement. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle discard changes dialog actions
  const handleDiscardChanges = () => {
    setShowDiscardDialog(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  const handleKeepEditing = () => {
    setShowDiscardDialog(false);
    setPendingNavigation(null);
  };

  const handleSaveAndContinue = async () => {
    try {
      setIsLoading(true);
      setErrors({});

      if (!announcement) return;

      // Validation (same as in handleSubmit)
      const newErrors: Record<string, string> = {};
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.content.trim()) newErrors.content = "Content is required";
      if (formData.categories.length === 0)
        newErrors.categories = "At least one category is required";
      if (
        !formData.status &&
        (!formData.publishDate || !formData.publishTime)
      ) {
        newErrors.publishDate =
          "Publish date and time are required for scheduled announcements";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      // Save changes (same logic as in handleSubmit)
      const now = new Date().toISOString();
      const publishDateTime = combineDateAndTime(
        formData.publishDate,
        formData.publishTime
      );

      const updateData: any = {
        id: announcement._id,
        title: formData.title.trim(),
        content: formData.content.trim(),
        categories: formData.categories as any,
        lastUpdate: now,
        status: formData.status,
      };

      if (formData.status) {
        updateData.publishedAt = now;
      } else {
        updateData.publishedAt = publishDateTime;
      }

      await updateAnnouncement(updateData);

      // Update original data and close dialog
      setOriginalData({ ...formData });
      setShowDiscardDialog(false);

      // Navigate to pending location
      if (pendingNavigation) {
        navigate(pendingNavigation);
        setPendingNavigation(null);
      }
    } catch (error) {
      console.error("Failed to save:", error);
      setErrors({ submit: "Failed to save announcement. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const timeOptions = generateTimeOptions();

  if (!isNewAnnouncement && !announcement) {
    return (
      <Layout>
        <div className="bg-white p-6 w-full max-w-2xl mx-auto">
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">
            {isNewAnnouncement
              ? "Create new announcement"
              : "Edit announcement"}
          </h1>
          {!isNewAnnouncement && announcement && (
            <Badge
              variant={announcement.status ? "default" : "secondary"}
              className={
                announcement.status
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {announcement.status ? "Published" : "Unpublished"}
            </Badge>
          )}
        </div>

        {!isNewAnnouncement && announcement ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Title" error={errors.title}>
              <Input
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Content" error={errors.content}>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter announcement content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                disabled={isLoading}
                rows={6}
              />
            </FormField>

            <FormField label="Categories" error={errors.categories}>
              <MultiSelect
                options={categories}
                selected={formData.categories}
                onChange={(selected) =>
                  handleInputChange("categories", selected)
                }
                placeholder="Select categories..."
                disabled={isLoading}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Publish Date" error={errors.publishDate}>
                <Input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) =>
                    handleInputChange("publishDate", e.target.value)
                  }
                  disabled={isLoading}
                  min={formatDateForInput(new Date())}
                />
              </FormField>

              <FormField label="Publish Time" error={errors.publishTime}>
                <Select
                  value={formData.publishTime}
                  onValueChange={(value) =>
                    handleInputChange("publishTime", value)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <FormField label="Status">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="status"
                  checked={formData.status}
                  onChange={(e) =>
                    handleInputChange("status", e.target.checked)
                  }
                  disabled={isLoading}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label="Published status"
                />
                <Label htmlFor="status" className="text-sm font-normal">
                  Publish immediately (ignores scheduled time)
                </Label>
              </div>
            </FormField>

            <div className="text-sm text-gray-500 space-y-1">
              <p>
                Created: {new Date(announcement._creationTime).toLocaleString()}
              </p>
              <p>
                Scheduled:{" "}
                {announcement.publishedAt
                  ? new Date(announcement.publishedAt).toLocaleString()
                  : "Not scheduled"}
              </p>
              <p>
                Last Update:{" "}
                {new Date(announcement.lastUpdate).toLocaleString()}
              </p>
            </div>

            {errors.submit && (
              <p className="text-sm text-red-600">{errors.submit}</p>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-neutral-600">
              Use the "Add Announcement" button in the announcements list to
              create new announcements.
            </p>
          </div>
        )}
      </div>

      {/* Discard Changes Dialog */}
      <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. What would you like to do?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel onClick={handleKeepEditing}>
              Keep Editing
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSaveAndContinue}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save & Continue
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleDiscardChanges}
              className="bg-red-600 hover:bg-red-700"
            >
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
