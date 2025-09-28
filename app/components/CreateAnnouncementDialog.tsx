import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MultiSelect, type MultiSelectOption } from "./ui/multi-select";
import { FormField } from "./ui/FormField";
import { Plus } from "lucide-react";
import {
  generateTimeOptions,
  combineDateAndTime,
  roundToNearestQuarter,
  formatDateForInput,
  formatTimeForInput,
} from "../../lib/datetime-utils";
import {
  createAnnouncementSchema,
  validateSchema,
  type CreateAnnouncementFormData,
} from "../../lib/validation";
import { ANNOUNCEMENT_CATEGORIES } from "../../lib/constants";
import { toast } from "sonner";

interface CreateAnnouncementDialogProps {
  children?: React.ReactNode;
}

export function CreateAnnouncementDialog({
  children,
}: CreateAnnouncementDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const createAnnouncement = useMutation(api.announcements.create);

  // Memoize time options to avoid regenerating on every render
  const timeOptions = React.useMemo(() => generateTimeOptions(), []);

  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
    categories: [] as string[],
    publishDate: "",
    publishTime: "",
    status: false,
  });

  // Initialize publish date/time to next 15-minute interval
  React.useEffect(() => {
    const nextInterval = roundToNearestQuarter(
      new Date(Date.now() + 15 * 60 * 1000)
    );
    setFormData((prev) => ({
      ...prev,
      publishDate: formatDateForInput(nextInterval),
      publishTime: formatTimeForInput(nextInterval),
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation using schema
    const validationData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      categories: formData.categories,
      publishDate: formData.publishDate,
      publishTime: formData.publishTime,
      status: formData.status,
    };

    const validationErrors = validateSchema(
      createAnnouncementSchema,
      validationData
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const now = new Date().toISOString();
      const publishDateTime = combineDateAndTime(
        formData.publishDate,
        formData.publishTime
      );

      const createData: any = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        categories: formData.categories as any,
        lastUpdate: now,
        status: formData.status,
      };

      // Handle publishedAt logic
      if (formData.status) {
        // If publishing immediately, set publishedAt to now
        createData.publishedAt = now;
      } else {
        // If scheduling for later, use the scheduled time
        createData.publishedAt = publishDateTime;
      }

      await createAnnouncement(createData);

      // Reset form and close dialog
      const nextInterval = roundToNearestQuarter(
        new Date(Date.now() + 15 * 60 * 1000)
      );
      setFormData({
        title: "",
        content: "",
        categories: [],
        publishDate: formatDateForInput(nextInterval),
        publishTime: formatTimeForInput(nextInterval),
        status: false,
      });
      setOpen(false);
      toast.success("Announcement created successfully!");
    } catch (error) {
      console.error("Failed to create announcement:", error);
      toast.error("Failed to create announcement. Please try again.");
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

  // timeOptions already memoized above

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Add Announcement</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
          <DialogDescription>
            Create a new announcement with all the necessary details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter announcement content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              disabled={isLoading}
              rows={4}
            />
          </FormField>

          <FormField label="Categories" error={errors.categories}>
            <MultiSelect
              options={ANNOUNCEMENT_CATEGORIES}
              selected={formData.categories}
              onChange={(selected) => handleInputChange("categories", selected)}
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
                onChange={(e) => handleInputChange("status", e.target.checked)}
                disabled={isLoading}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                aria-label="Publish immediately"
              />
              <Label htmlFor="status" className="text-sm font-normal">
                Publish immediately (ignores scheduled time)
              </Label>
            </div>
          </FormField>

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
