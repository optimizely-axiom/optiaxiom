export const format = ({
  hour,
  meridiem,
  minute,
}: {
  hour: string;
  meridiem: "AM" | "PM";
  minute: string;
}) => {
  const formattedHour = parseInt(hour) === 12 ? 0 : parseInt(hour);
  return (
    (formattedHour + (meridiem === "PM" ? 12 : 0)).toString().padStart(2, "0") +
    ":" +
    minute
  );
};

export const parse = (value: string | undefined, step = 1) => {
  const now = new Date();
  const [hour, minute] = (
    value ? value : `${now.getHours()}:${now.getMinutes()}`
  ).split(":");
  const parsedHour = parseInt(hour) % 12 === 0 ? 12 : parseInt(hour) % 12;
  return {
    hour: parsedHour.toString(),
    meridiem: parseInt(hour) < 12 ? ("AM" as const) : ("PM" as const),
    minute: (Math.floor(parseInt(minute) / step) * step)
      .toString()
      .padStart(2, "0"),
  };
};

export const range = (min: number, max: number, step = 1) =>
  Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, index) =>
    (min + index * step).toString(),
  );
