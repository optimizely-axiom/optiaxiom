import type { ComponentPropsWithoutRef, ReactNode } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

type AxiomProviderProps = {
  children?: ReactNode;
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

export function AxiomProvider({ children, tooltip }: AxiomProviderProps) {
  return (
    <TooltipPrimitive.Provider {...tooltip}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

AxiomProvider.displayName = "@optiaxiom/react/AxiomProvider";
