import { AxiomVersionContext } from "@optiaxiom/globals";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useContext,
} from "react";

import { version } from "../../package.json";
import { DialogKitProvider } from "../dialog-kit/internals";
import { FocusBookmarkProvider } from "../focus-bookmark";
import { LocaleProvider } from "../locale";
import { SuggestionProvider } from "../suggestion/internals";
import { ThemeProvider } from "../theme-provider";
import { ToastProvider } from "../toast";
import { TooltipProvider } from "../tooltip";

export type AxiomProviderProps = {
  children?: ReactNode;
  /**
   * Props for the `DialogKitProvider` component
   *
   * {@link https://optimizely-axiom.github.io/optiaxiom/components/dialog/ Documentation}
   */
  dialog?: Omit<DialogKitProviderProps, "children">;
  /**
   * BCP-47 language tag (e.g. `"fr-FR"`) used to localize date/time components
   * such as `Calendar`, `DateRangePicker`, `Clock`, and `Time`. Defaults to the
   * browser locale.
   */
  locale?: string;
  /**
   * Props for the `ToastProvider` component
   *
   * {@link https://optimizely-axiom.github.io/optiaxiom/components/toast/ Documentation}
   */
  toast?: Omit<ToastProviderProps, "children">;
  /**
   * Props for the `TooltipProvider` component
   *
   * {@link https://optimizely-axiom.github.io/optiaxiom/components/tooltip/ Documentation}
   */
  tooltip?: Omit<TooltipProviderProps, "children">;
};

interface DialogKitProviderProps
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  extends ComponentPropsWithoutRef<typeof DialogKitProvider> {}

interface ToastProviderProps
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  extends ComponentPropsWithoutRef<typeof ToastProvider> {}

interface TooltipProviderProps
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  extends ComponentPropsWithoutRef<typeof TooltipProvider> {}

/**
 * `AxiomProvider` provides all the context managers required for our components to work. It must be rendered at the root of your application and should be used only once.
 *
 * @category provider
 * @since 0.1.0
 */
export function AxiomProvider({
  children,
  dialog,
  locale,
  toast,
  tooltip,
}: AxiomProviderProps) {
  const resolvedLocale =
    locale ?? (typeof navigator !== "undefined" ? navigator.language : "en-US");

  const axiom = useContext(AxiomVersionContext);
  if (!axiom) {
    children = (
      <ThemeProvider>
        <SuggestionProvider>
          {children}

          <ToastProvider {...toast} />
        </SuggestionProvider>
      </ThemeProvider>
    );
  }

  return (
    <AxiomVersionContext.Provider value={version}>
      <LocaleProvider locale={resolvedLocale}>
        <TooltipProvider {...tooltip}>
          <FocusBookmarkProvider>
            {children}
            <DialogKitProvider {...dialog} />
          </FocusBookmarkProvider>
        </TooltipProvider>
      </LocaleProvider>
    </AxiomVersionContext.Provider>
  );
}

AxiomProvider.displayName = "@optiaxiom/react/AxiomProvider";
