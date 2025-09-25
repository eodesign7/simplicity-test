import type { CategoryDropdownProps } from "../../../types";
import { availableCategories } from "../../../lib/mock-data";

export function CategoryDropdown({
  selectedCategories,
  onToggleCategory,
  isOpen,
  onToggle,
  error,
}: CategoryDropdownProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-neutral-700 mb-2">
        Category
      </label>
      <p className="text-sm text-neutral-500 mb-4">
        Select category so readers know what your announcement is about.
      </p>
      <div className="relative">
        <div
          className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white min-h-[40px] flex items-center flex-wrap gap-2 cursor-pointer placeholder:text-neutral-600"
          onClick={onToggle}
        >
          {selectedCategories && selectedCategories.length > 0 ? (
            selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-200 text-neutral-600 rounded text-sm"
              >
                {category}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCategory(category);
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
              isOpen ? "rotate-180" : ""
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
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-48 overflow-y-scroll scrollbar-hide z-10">
            {availableCategories
              .filter((cat) => !selectedCategories?.includes(cat))
              .map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    onToggleCategory(category);
                    onToggle();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-neutral-600 hover:bg-gray-50"
                >
                  {category}
                </button>
              ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
