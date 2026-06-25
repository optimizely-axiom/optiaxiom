import { memoize } from "../utils";

/**
 * `Intl` construction is expensive, so we memoize the formatter per locale.
 */
const formatterFor = memoize(
  (locale: string) => new Intl.DateTimeFormat(locale, { timeZoneName: "long" }),
);

export const toTimeZoneName = (locale: string, date: Date) => {
  const parts = formatterFor(locale).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
};
