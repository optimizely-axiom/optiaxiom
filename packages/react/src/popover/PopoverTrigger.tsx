import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { usePopoverContext } from "./PopoverContext";
import { usePopoverScope } from "./usePopoverScope";

export type PopoverTriggerProps = ButtonProps<typeof RadixPopover.Trigger>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { open, presence } = usePopoverContext(
    "@optiaxiom/react/PopoverTrigger",
  );

  return (
    <RadixPopover.Trigger
      aria-expanded={open || presence}
      asChild
      data-state={open || presence ? "open" : "closed"}
      ref={ref}
      {...props}
      {...usePopoverScope(undefined)}
    >
      {asChild ? children : <Button>{children}</Button>}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
