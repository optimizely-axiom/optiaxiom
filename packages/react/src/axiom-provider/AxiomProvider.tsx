import type { ComponentPropsWithoutRef, ReactNode } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

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
  return (
    <TooltipPrimitive.Provider {...tooltip}>
      {children}

      {toast && <ToastProvider {...toast} />}
    </TooltipPrimitive.Provider>
  );
}

AxiomProvider.displayName = "@optiaxiom/react/AxiomProvider";
