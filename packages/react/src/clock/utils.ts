import { memoize } from "../utils";

/**
 * `Intl` construction is expensive, so we memoize per locale. Values are stable
 * for a given locale.
 */
const localeData = memoize((locale: string) => {
  const intlLocale = new Intl.Locale(locale);
  const hourCycles =
    "getHourCycles" in intlLocale &&
    typeof intlLocale.getHourCycles === "function"
      ? (intlLocale.getHourCycles() as string[])
      : ["h12"];

  return {
    dayPeriodFormatter: new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      hour12: true,
    }),
    is24Hour: hourCycles[0] === "h23",
    numberFormatter: new Intl.NumberFormat(locale, { useGrouping: false }),
  };
});

export const is24Hour = (locale: string) => localeData(locale).is24Hour;

/**
 * Transliterates the digits of an already-formatted numeric string (e.g.
 * `"05"`) into the locale's numbering system (e.g. `"०५"` for `mr-IN`),
 * preserving any existing padding. This is digit transliteration rather than a
 * date format because the clock's value is a `HH:mm` string, not a `Date` — the
 * underlying Latin value stays unchanged so the time contract is preserved.
 */
export const toLabel = (locale: string, value: string) =>
  value
    .split("")
    .map((digit) => localeData(locale).numberFormatter.format(Number(digit)))
    .join("");

/**
 * Returns the localized AM/PM label — date-fns's `aaa` token, via `Intl`. Yields
 * `"ص"`/`"م"` for `ar`, but still `"AM"`/`"PM"` for locales like `mr` that use
 * them by convention.
 */
export const toMeridiemLabel = (locale: string, meridiem: "AM" | "PM") =>
  localeData(locale)
    .dayPeriodFormatter.formatToParts(
      new Date(2025, 0, 1, meridiem === "AM" ? 9 : 21),
    )
    .find((part) => part.type === "dayPeriod")?.value ?? meridiem;

export const format = (
  is24Hour: boolean,
  {
    hour,
    meridiem,
    minute,
  }: {
    hour: string;
    meridiem: "AM" | "PM";
    minute: string;
  },
) => {
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

export const parse = (
  is24Hour: boolean,
  value: string | undefined,
  step = 1,
) => {
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
