import { en, type Messages } from "./en";
import { useLocaleContext } from "./LocaleContext";

const catalogs = new Map<string, Messages>(Object.entries({ en }));

/**
 * Built-in labels and messages in the `AxiomProvider` locale's language,
 * falling back to English.
 */
export const useMessages = () =>
  catalogs.get(useLocaleContext("@optiaxiom/react/useMessages").language) ?? en;
