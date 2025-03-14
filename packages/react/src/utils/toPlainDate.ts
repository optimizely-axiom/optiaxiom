import { toPlainDateTime } from "./toPlainDateTime";

/**
 * Convert an instant Date to a local date string without time and timezone.
 */
export const toPlainDate = (date: Date) => toPlainDateTime(date).split("T")[0];
