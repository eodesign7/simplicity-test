import type { MultiSelectOption } from "../app/components/ui/multi-select";

// Announcement categories - used across multiple components
export const ANNOUNCEMENT_CATEGORIES: MultiSelectOption[] = [
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

// Time generation settings
export const TIME_SETTINGS = {
  intervalMinutes: 15,
  startHour: 0,
  endHour: 24,
} as const;
