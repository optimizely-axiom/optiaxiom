/**
 * The browser's preferred locale, used to localize dates without requiring a
 * `locale` prop. Falls back to `en-US` when unavailable (e.g. SSR).
 */
const language =
  typeof navigator !== "undefined" ? navigator.language : "en-US";

const dateTimeFormat = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(language, options).format;
/**
 * Bare numbers go through `NumberFormat` rather than `DateTimeFormat` because
 * the latter appends date-unit suffixes in some locales (e.g. `5日` in `zh`),
 * which we don't want for day/year cells.
 */
const numberFormat = new Intl.NumberFormat(language, { useGrouping: false })
  .format;

const tokens = {
  cccccc: dateTimeFormat({ weekday: "short" }),
  d: (date: Date) => numberFormat(date.getDate()),
  LLL: dateTimeFormat({ month: "short" }),
  LLLL: dateTimeFormat({ month: "long" }),
  "LLLL yyyy": dateTimeFormat({ month: "long", year: "numeric" }),
  yyyy: (date: Date) => numberFormat(date.getFullYear()),
};

/**
 * A locale-aware `formatDate(date, token)` modeled on date-fns's `format`, but
 * backed by `Intl` and limited to the tokens we actually use:
 *
 * - `d` — day of month (`5`)
 * - `yyyy` — year (`2025`)
 * - `LLL` — standalone short month (`Jan`)
 * - `LLLL` — standalone full month (`January`)
 * - `LLLL yyyy` — month and year (`January 2025`)
 * - `cccccc` — standalone short weekday (`Su`)
 *
 * Add new tokens to the map above as components need them, rather than parsing
 * arbitrary format strings.
 */
export const formatDate = (date: Date, token: keyof typeof tokens) =>
  tokens[token](date);
