/**
 * Convert an instant Date to a local date and time string without timezone.
 */
export const toPlainDateTime = (date: Date) =>
  new Date(date.getTime() - new Date(date).getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .slice(0, -1);
