import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { TooltipProvider } from "./TooltipContext";

export type TooltipRootProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Root
> & {
  /**
   * Enable this option to only show the tooltip when children is partially hidden due to text overflow.
   */
  auto?: boolean;
};

export function TooltipRoot({
  auto,
  children,
  defaultOpen = false,
  delayDuration,
  onOpenChange,
  open: openProp,
  ...props
}: TooltipRootProps) {
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/TooltipRoot",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixTooltip.Root
      delayDuration={delayDuration}
      onOpenChange={setOpen}
      open={open}
      {...props}
    >
      <TooltipProvider auto={auto} open={open} setOpen={setOpen}>
        {children}
      </TooltipProvider>
    </RadixTooltip.Root>
  );
}

TooltipRoot.displayName = "@optiaxiom/react/TooltipRoot";
