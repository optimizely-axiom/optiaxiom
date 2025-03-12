export const toLocalDate = (date: Date) =>
  new Date(date.getTime() - new Date(date).getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .slice(0, -1);
