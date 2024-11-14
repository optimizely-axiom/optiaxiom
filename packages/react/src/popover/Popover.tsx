import type { ComponentPropsWithoutRef } from "react";

import * as RadixPopover from "@radix-ui/react-popover";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { PopoverContextProvider } from "../popover-context";

type PopoverProps = ComponentPropsWithoutRef<typeof RadixPopover.Root>;

export function Popover({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: PopoverProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixPopover.Root onOpenChange={setOpen} open={open} {...props}>
      <PopoverContextProvider open={open}>{children}</PopoverContextProvider>
    </RadixPopover.Root>
  );
}

Popover.displayName = "@optiaxiom/react/Popover";
