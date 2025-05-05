export const presetToRange = (preset: string) => {
  const today = new Date();
  switch (preset) {
    case "month":
      return { from: startOfMonth(today), to: endOfMonth(today) };
    case "next-month": {
      const nextMonth = new Date(today);
      nextMonth.setDate(1);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return { from: startOfMonth(nextMonth), to: endOfMonth(nextMonth) };
    }
    case "next-week": {
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return { from: startOfWeek(nextWeek), to: endOfWeek(nextWeek) };
    }
    case "today":
      return { from: today, to: today };
    case "week":
      return { from: startOfWeek(today), to: endOfWeek(today) };
  }
  return null;
};

const endOfMonth = (date: Date) => {
  const result = startOfMonth(date);
  result.setMonth(result.getMonth() + 1);
  result.setDate(0);
  return result;
};

const startOfMonth = (date: Date) => {
  const result = new Date(date);
  result.setDate(1);
  return result;
};

const endOfWeek = (date: Date) => {
  const result = startOfWeek(date);
  result.setDate(result.getDate() + 6);
  return result;
};

const startOfWeek = (date: Date) => {
  const result = new Date(date);
  result.setDate(result.getDate() - result.getDay());
  return result;
};
