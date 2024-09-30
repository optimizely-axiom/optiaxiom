import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { MenuButton } from "../menu-button";
import { extractSprinkles } from "../sprinkles";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixPopover.Trigger asChild ref={ref} {...sprinkleProps}>
      {asChild ? children : <MenuButton {...restProps}>{children}</MenuButton>}
    </RadixPopover.Trigger>
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
