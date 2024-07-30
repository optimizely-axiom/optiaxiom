import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";

type PopoverTriggerProps = BoxProps<typeof RadixPopover.Trigger>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <RadixPopover.Trigger asChild ref={ref} {...props}>
      {asChild ? (
        children
      ) : (
        <Button icon={<IconAngleDown />} iconPosition="end">
          {children}
        </Button>
      )}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
