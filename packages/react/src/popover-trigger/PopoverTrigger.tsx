import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { usePopoverContext } from "../popover-context";

type PopoverTriggerProps = ButtonProps<typeof RadixPopover.Trigger>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { setOpen, trigger } = usePopoverContext("PopoverTrigger");

  return (
    <RadixPopover.Trigger
      asChild
      onPointerEnter={() => (trigger === "hover" ? setOpen(true) : undefined)}
      onPointerLeave={() => (trigger === "hover" ? setOpen(false) : undefined)}
      ref={ref}
      type={undefined}
      {...props}
    >
      {asChild ? children : <Button>{children}</Button>}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
