import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { MenuButton } from "../menu-button";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof Button>;

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
