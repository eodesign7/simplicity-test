// Generate time options in 15-minute intervals
export function generateTimeOptions(): string[] {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }
  return times;
}

// Round time to nearest 15-minute interval
export function roundToNearestQuarter(date: Date): Date {
  const minutes = date.getMinutes();
  const roundedMinutes = Math.round(minutes / 15) * 15;
  const newDate = new Date(date);
  newDate.setMinutes(roundedMinutes, 0, 0);
  return newDate;
}

// Format date for input
export function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Format time for input
export function formatTimeForInput(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

// Combine date and time strings into ISO string
export function combineDateAndTime(dateStr: string, timeStr: string): string {
  return new Date(`${dateStr}T${timeStr}:00`).toISOString();
}

// Parse ISO string to date and time components
export function parseDateTime(isoString: string): {
  date: string;
  time: string;
} {
  const date = new Date(isoString);
  // Round to nearest 15-minute interval for select compatibility
  const roundedDate = roundToNearestQuarter(date);
  return {
    date: formatDateForInput(date), // Use original date
    time: formatTimeForInput(roundedDate), // Use rounded time
  };
}

// Format datetime for display (without seconds)
export function formatDateTimeForDisplay(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return (
    dateObj.toLocaleDateString() +
    " " +
    dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
}
