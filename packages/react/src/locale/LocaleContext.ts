"use client";

import { createContext } from "@radix-ui/react-context";

/**
 * The browser's preferred locale, used to localize date/time components without
 * requiring a `locale` prop. Falls back to `en-US` when unavailable (e.g. SSR).
 */
const browserLocale =
  typeof navigator !== "undefined" ? navigator.language : "en-US";

/**
 * `locale` is the BCP-47 tag date/time components (Calendar, DateRangePicker,
 * Clock, Time) format with; it falls back to the browser locale. `language` is
 * the subtag built-in labels are translated into; it falls back to English, so
 * labels never follow the browser into an English-only product.
 */
export const [LocaleProvider, useLocaleContext] = createContext<{
  language: string;
  locale: string;
}>("@optiaxiom/react/Locale", { language: "en", locale: browserLocale });
