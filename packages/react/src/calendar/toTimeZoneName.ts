/**
 * Not memoized: a formatter keeps the timezone it was constructed in, and this
 * label must name the current one.
 */
export const toTimeZoneName = (locale: string, date: Date) => {
  const parts = new Intl.DateTimeFormat(locale, {
    timeZoneName: "long",
  }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
};
