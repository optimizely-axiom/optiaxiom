import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { usePopoverContext } from "../popover-context";

type PopoverTriggerProps = ButtonProps<typeof RadixPopover.Trigger>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { presence } = usePopoverContext("PopoverTrigger");

  return (
    <RadixPopover.Trigger
      asChild
      data-expanded={presence ? "" : undefined}
      ref={ref}
      {...props}
    >
      {asChild ? children : <Button>{children}</Button>}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
