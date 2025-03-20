const formatter = new Intl.DateTimeFormat(undefined, {
  timeZoneName: "long",
});

export const toTimeZoneName = (date: Date) => {
  const parts = formatter.formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
};
