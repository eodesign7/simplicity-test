import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


interface AnnouncementFormProps {
  id?: string;
}

export function AnnouncementForm({ id }: AnnouncementFormProps) {
  // TODO: Implement with Convex backend
  const isNewAnnouncement = !id || id === "new";
  const isDropdownOpen = false;
  const setIsDropdownOpen = () => {};
  const dropdownRef = null;
  const watchedCategories: string[] = [];
  const toggleCategory = () => {};
  const onSubmit = () => {};

  // TODO: Implement with Convex backend
  const register = () => ({});
  const handleSubmit = (fn: any) => (e: any) => e.preventDefault();
  const errors = {};
  const isSubmitting = false;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <FormField label="Title" error={errors.title?.message}>
        <input
          type="text"
          {...register("title")}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-600 text-neutral-600 focus:text-neutral-900"
          placeholder="Enter announcement title"
        />
      </FormField>

      {/* Content */}
      <FormField label="Content" error={errors.content?.message}>
        <textarea
          rows={4}
          {...register("content")}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-600 text-neutral-600 focus:text-neutral-900"
          placeholder="Enter announcement content"
        />
      </FormField>

      {/* Categories */}
      <div ref={dropdownRef}>
        <CategoryDropdown
          selectedCategories={watchedCategories || []}
          onToggleCategory={toggleCategory}
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          error={errors.categories?.message}
        />
      </div>

      {/* Publication Date */}
      <FormField
        label="Publication date"
        error={errors.publicationDate?.message}
      >
        <input
          type="text"
          {...register("publicationDate")}
          placeholder="MM/DD/YYYY HH:mm"
          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-neutral-600 text-neutral-600 focus:text-neutral-900"
        />
      </FormField>

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
  );
}
