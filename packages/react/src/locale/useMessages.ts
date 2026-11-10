import { useLocaleContext } from "./LocaleContext";

/**
 * Built-in labels and messages in the `AxiomProvider` locale's language.
 */
export const useMessages = () =>
  useLocaleContext("@optiaxiom/react/useMessages").messages;
