const options: Record<string, Intl.DateTimeFormatOptions> = {
  date: {
    day: "numeric",
    month: "short",
    year: "numeric",
  },
  hideYear: {
    year: undefined,
  },
  time: {
    hour: "numeric",
    minute: "numeric",
  },
  timeZone: {
    timeZoneName: "short",
  },
  weekday: {
    weekday: "short",
  },
};

export function formatDate(date: Date, { showDate = true, showTime = false }) {
  return date.toLocaleString(["default", "en-US"], {
    ...(showDate ? options.date : {}),
    ...(showTime ? options.time : {}),
  });
}
