import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";
import { extractSprinkles } from "../sprinkles";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixPopover.Trigger asChild ref={ref} {...sprinkleProps}>
      {asChild ? (
        children
      ) : (
        <Button icon={<IconAngleDown />} iconPosition="end" {...restProps}>
          {children}
        </Button>
      )}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
