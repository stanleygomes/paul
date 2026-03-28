import { format, formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export const humanizeDate = (date: Date): string => {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: enUS,
  });
};

export const formatDate = (dateStr: string): string => {
  try {
    const date = parseISO(dateStr);
    return new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
    }).format(date);
  } catch (e) {
    return dateStr;
  }
};

export const formatTime = (timeStr: string): string => {
  try {
    // timeStr is usually HH:mm
    const parts = timeStr.split(":").map(Number);
    const [hours, minutes] = parts;

    if (
      parts.length !== 2 ||
      hours === undefined ||
      minutes === undefined ||
      isNaN(hours) ||
      isNaN(minutes)
    ) {
      return timeStr;
    }

    const date = new Date();
    date.setHours(hours, minutes);

    return new Intl.DateTimeFormat(navigator.language, {
      timeStyle: "short",
    }).format(date);
  } catch (e) {
    return timeStr;
  }
};
