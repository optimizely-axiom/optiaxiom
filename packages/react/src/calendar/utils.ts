export const withMonth = (date: Date, month: number) => {
  const next = new Date(date);
  next.setDate(1);
  next.setMonth(month);
  next.setDate(Math.min(date.getDate(), getDaysOfMonth(next)));
  return next;
};

export const withYear = (date: Date, year: number) => {
  const next = new Date(date);
  next.setDate(1);
  next.setFullYear(year);
  next.setDate(Math.min(date.getDate(), getDaysOfMonth(next)));
  return next;
};

const getDaysOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
