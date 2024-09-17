import { AxiomVersionContext } from "@optiaxiom/globals";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useContext,
} from "react";

import { version } from "../../package.json";
import { ThemeProvider } from "../theme-provider";
import { ToastProvider } from "../toast-provider";

type AxiomProviderProps = {
  children?: ReactNode;
  /**
   * Props for the `ToastProvider` component
   *
   * {@link https://optimizely-axiom.github.io/optiaxiom/components/toast/ Documentation}
   */
  toast?: Omit<ComponentPropsWithoutRef<typeof ToastProvider>, "children">;
  /**
   * Props for the `TooltipProvider` component
   *
   * {@link https://www.radix-ui.com/primitives/docs/components/tooltip#provider Documentation}
   */
  tooltip?: Omit<
    ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>,
    "children"
  >;
};

export function AxiomProvider({
  children,
  toast,
  tooltip,
}: AxiomProviderProps) {
  const axiom = useContext(AxiomVersionContext);
  if (axiom) {
    return <>{children}</>;
  }

  return (
    <AxiomVersionContext.Provider value={version}>
      <TooltipPrimitive.Provider {...tooltip}>
        <ThemeProvider>
          {children}

          <ToastProvider {...toast} />
        </ThemeProvider>
      </TooltipPrimitive.Provider>
    </AxiomVersionContext.Provider>
  );
}

AxiomProvider.displayName = "@optiaxiom/react/AxiomProvider";
