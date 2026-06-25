"use client";

import { createContext } from "@radix-ui/react-context";

/**
 * The browser's preferred locale, used to localize date/time components without
 * requiring a `locale` prop. Falls back to `en-US` when unavailable (e.g. SSR).
 */
const browserLocale =
  typeof navigator !== "undefined" ? navigator.language : "en-US";

/**
 * Holds the BCP-47 locale used by date/time components (Calendar,
 * DateRangePicker, Clock, Time). The default value is the browser locale, so
 * `useLocaleContext` always returns a usable value even without a provider.
 */
export const [LocaleProvider, useLocaleContext] = createContext<{
  locale: string;
}>("@optiaxiom/react/Locale", { locale: browserLocale });
