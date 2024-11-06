import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { type ButtonProps } from "../button";
import { MenuButton } from "../menu-button";

type PopoverTriggerProps = ButtonProps<typeof RadixPopover.Trigger>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <RadixPopover.Trigger asChild ref={ref} {...props}>
      {asChild ? children : <MenuButton>{children}</MenuButton>}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
