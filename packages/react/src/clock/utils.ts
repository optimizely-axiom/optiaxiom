const language =
  typeof navigator !== "undefined" ? navigator.language : "en-US";
const locale = new Intl.Locale(language);
const hourCycles =
  "getHourCycles" in locale && typeof locale.getHourCycles === "function"
    ? (locale.getHourCycles() as string[])
    : ["h12"];
export const is24Hour = hourCycles[0] === "h23";

const numberFormatter = new Intl.NumberFormat(language, { useGrouping: false });

/**
 * Transliterates the digits of an already-formatted numeric string (e.g.
 * `"05"`) into the browser locale's numbering system (e.g. `"०५"` for `mr-IN`),
 * preserving any existing padding. This is digit transliteration rather than a
 * date format because the clock's value is a `HH:mm` string, not a `Date` — the
 * underlying Latin value stays unchanged so the time contract is preserved.
 */
export const toLabel = (value: string) =>
  value
    .split("")
    .map((digit) => numberFormatter.format(Number(digit)))
    .join("");

const dayPeriodFormatter = new Intl.DateTimeFormat(language, {
  hour: "numeric",
  hour12: true,
});

/**
 * Returns the localized AM/PM label — date-fns's `aaa` token, via `Intl`. Yields
 * `"ص"`/`"م"` for `ar`, but still `"AM"`/`"PM"` for locales like `mr` that use
 * them by convention.
 */
export const toMeridiemLabel = (meridiem: "AM" | "PM") =>
  dayPeriodFormatter
    .formatToParts(new Date(2025, 0, 1, meridiem === "AM" ? 9 : 21))
    .find((part) => part.type === "dayPeriod")?.value ?? meridiem;

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
