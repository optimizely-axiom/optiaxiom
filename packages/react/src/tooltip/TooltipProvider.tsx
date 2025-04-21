import type { ComponentPropsWithoutRef } from "react";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import type { ExtendProps } from "../utils";

type TooltipProviderProps = ExtendProps<
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>,
  {
    /**
     * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
     */
    disableHoverableContent?: boolean;
  }
>;

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
