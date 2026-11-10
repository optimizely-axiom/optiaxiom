"use client";

import { createContext } from "@radix-ui/react-context";

import { locale as en, type Messages } from "./en";

/**
 * A language for built-in labels and screen reader text, plus the locale
 * date/time components format with.
 *
 * @docs opaque
 */
export type Locale = {
  /**
   * BCP-47 tag date/time components format with, e.g. `"de-AT"`.
   */
  code: string;
  /**
   * Every built-in label, keyed by its English text.
   */
  messages: Messages;
};

/**
 * The browser's preferred locale, used to localize date/time components without
 * requiring a `locale` prop. Falls back to `en-US` when unavailable (e.g. SSR).
 */
const browserLocale =
  typeof navigator !== "undefined" ? navigator.language : "en-US";

/**
 * `locale` is the BCP-47 tag date/time components (Calendar, DateRangePicker,
 * Clock, Time) format with; it falls back to the browser locale. `messages`
 * are the built-in labels; they stay English unless the consumer passes a
 * `Locale`, so labels never follow the browser into an English-only product.
 */
export const [LocaleProvider, useLocaleContext] = createContext<{
  locale: string;
  messages: Messages;
}>("@optiaxiom/react/Locale", { locale: browserLocale, messages: en.messages });
