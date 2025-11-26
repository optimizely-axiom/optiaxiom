import type { ComponentPropsWithoutRef } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import type { ExtendProps } from "../utils";

export type TooltipProviderProps = ExtendProps<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>,
  {
    /**
     * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
     */
    disableHoverableContent?: boolean;
  }
>;

/**
 * Provider component for tooltips. This is included in AxiomProvider by default - you only need to use this component directly for advanced customization.
 *
 * @group Tooltip
 */
export function TooltipProvider({
  disableHoverableContent = true,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      disableHoverableContent={disableHoverableContent}
      {...props}
    />
  );
}

TooltipProvider.displayName = "@optiaxiom/react/TooltipProvider";
