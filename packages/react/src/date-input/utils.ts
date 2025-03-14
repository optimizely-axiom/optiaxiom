/**
 * Convert string to an instant Date object with time and timezone.
 */
export function toInstant(
  str: number | readonly string[] | string | undefined,
) {
  const rawDate = str && typeof str === "string" ? new Date(str) : undefined;
  return isValidDate(rawDate) ? rawDate : undefined;
}

const isValidDate = (date: Date | undefined): date is Date =>
  date ? !isNaN(+date) : false;
