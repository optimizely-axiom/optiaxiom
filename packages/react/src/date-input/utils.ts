import { toLocalDate } from "../utils";

/**
 * Format instant datetime object into local date string.
 */
export function format(date: Date) {
  return toLocalDate(date).split("T")[0];
}

/**
 * Attempt to parse string value into Date object.
 *
 * We first check if it's a valid date and then epoch shift to generate UTC
 * date object from local date string.
 */
export function parse(str: number | readonly string[] | string | undefined) {
  const rawDate = str && typeof str === "string" ? new Date(str) : undefined;
  return isValidDate(rawDate)
    ? new Date(
        rawDate.getTime() + new Date(rawDate).getTimezoneOffset() * 60 * 1000,
      )
    : undefined;
}

const isValidDate = (date: Date | undefined): date is Date =>
  date ? !isNaN(+date) : false;
