const locale = new Intl.Locale(navigator.language ?? "en-US");
const hourCycles =
  "getHourCycles" in locale && typeof locale.getHourCycles === "function"
    ? (locale.getHourCycles() as string[])
    : ["h12"];
export const is24Hour = hourCycles[0] === "h23";

export const format = ({
  hour,
  meridiem,
  minute,
}: {
  hour: string;
  meridiem: "AM" | "PM";
  minute: string;
}) => {
  return (
    (is24Hour
      ? hour
      : (
          (parseInt(hour) === 12 ? 0 : parseInt(hour)) +
          (meridiem === "PM" ? 12 : 0)
        )
          .toString()
          .padStart(2, "0")) +
    ":" +
    minute
  );
};

export const parse = (value: string | undefined, step = 1) => {
  const now = new Date();
  const [hour, minute] = (
    value ? value : `${now.getHours()}:${now.getMinutes()}`
  ).split(":");

  return {
    hour: is24Hour
      ? parseInt(hour).toString().padStart(2, "0")
      : (parseInt(hour) % 12 === 0 ? 12 : parseInt(hour) % 12).toString(),
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
