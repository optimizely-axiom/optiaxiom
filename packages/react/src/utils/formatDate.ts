import { memoize } from "./memoize";

const dateTimeFormat = (locale: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, options).format;
/**
 * Bare numbers go through `NumberFormat` rather than `DateTimeFormat` because
 * the latter appends date-unit suffixes in some locales (e.g. `5日` in `zh`),
 * which we don't want for day/year cells.
 */
const numberFormat = (locale: string) =>
  new Intl.NumberFormat(locale, { useGrouping: false }).format;

const buildTokens = (locale: string) => ({
  ccccc: dateTimeFormat(locale, { weekday: "narrow" }),
  d: (date: Date) => numberFormat(locale)(date.getDate()),
  LLL: dateTimeFormat(locale, { month: "short" }),
  LLLL: dateTimeFormat(locale, { month: "long" }),
  "LLLL yyyy": dateTimeFormat(locale, { month: "long", year: "numeric" }),
  yyyy: (date: Date) => numberFormat(locale)(date.getFullYear()),
});

/**
 * `Intl` formatter construction is expensive, so we memoize the token map per
 * locale. The values are stable for a given locale.
 */
const tokensFor = memoize(buildTokens);

/**
 * A locale-aware `formatDate(locale, date, token)` modeled on date-fns's
 * `format`, but backed by `Intl` and limited to the tokens we actually use:
 *
 * - `d` — day of month (`5`)
 * - `yyyy` — year (`2025`)
 * - `LLL` — standalone short month (`Jan`)
 * - `LLLL` — standalone full month (`January`)
 * - `LLLL yyyy` — month and year (`January 2025`)
 * - `ccccc` — standalone narrow weekday (`S`)
 *
 * Add new tokens to the map above as components need them, rather than parsing
 * arbitrary format strings.
 */
export const formatDate = (
  locale: string,
  date: Date,
  token: keyof ReturnType<typeof buildTokens>,
) => tokensFor(locale)[token](date);
