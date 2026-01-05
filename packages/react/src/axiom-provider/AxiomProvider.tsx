import { AxiomVersionContext } from "@optiaxiom/globals";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useContext,
} from "react";

import { version } from "../../package.json";
import { DialogKitProvider } from "../dialog-kit/internals";
import { FocusBookmarkProvider } from "../focus-bookmark";
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DialogKitProviderProps
  extends ComponentPropsWithoutRef<typeof DialogKitProvider> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ToastProviderProps
  extends ComponentPropsWithoutRef<typeof ToastProvider> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TooltipProviderProps
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
  toast,
  tooltip,
}: AxiomProviderProps) {
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
      <TooltipProvider {...tooltip}>
        <FocusBookmarkProvider>
          {children}
          <DialogKitProvider {...dialog} />
        </FocusBookmarkProvider>
      </TooltipProvider>
    </AxiomVersionContext.Provider>
  );
}

AxiomProvider.displayName = "@optiaxiom/react/AxiomProvider";
