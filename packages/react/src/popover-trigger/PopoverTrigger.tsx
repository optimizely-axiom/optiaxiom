import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type PopoverTriggerProps = ButtonProps<typeof RadixPopover.Trigger>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <RadixPopover.Trigger asChild ref={ref} {...props}>
      {asChild ? children : <Button>{children}</Button>}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
