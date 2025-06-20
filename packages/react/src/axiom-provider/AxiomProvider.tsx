import { AxiomVersionContext } from "@optiaxiom/globals";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useContext,
} from "react";

import { version } from "../../package.json";
import { FocusBookmarkProvider } from "../focus-bookmark";
import { ThemeProvider } from "../theme-provider";
import { ToastProvider } from "../toast";
import { TooltipProvider } from "../tooltip";

export type AxiomProviderProps = {
  children?: ReactNode;
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
interface ToastProviderProps
  extends ComponentPropsWithoutRef<typeof ToastProvider> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TooltipProviderProps
  extends ComponentPropsWithoutRef<typeof TooltipProvider> {}

export function AxiomProvider({
  children,
  toast,
  tooltip,
}: AxiomProviderProps) {
  const axiom = useContext(AxiomVersionContext);
  if (!axiom) {
    children = (
      <ThemeProvider>
        {children}

        <ToastProvider {...toast} />
      </ThemeProvider>
    );
  }

  return (
    <AxiomVersionContext.Provider value={version}>
      <TooltipProvider {...tooltip}>
        <FocusBookmarkProvider>{children}</FocusBookmarkProvider>
      </TooltipProvider>
    </AxiomVersionContext.Provider>
  );
}

AxiomProvider.displayName = "@optiaxiom/react/AxiomProvider";
