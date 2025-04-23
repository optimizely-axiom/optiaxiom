import type { ComponentPropsWithoutRef } from "react";

import { Tooltip as RadixTooltip } from "radix-ui";

import type { ExtendProps } from "../utils";

type TooltipProviderProps = ExtendProps<
  ComponentPropsWithoutRef<typeof RadixTooltip.Provider>,
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
    <RadixTooltip.Provider
      disableHoverableContent={disableHoverableContent}
      {...props}
    />
  );
}

TooltipProvider.displayName = "@optiaxiom/react/TooltipProvider";
