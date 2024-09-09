import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";
import { extractSprinkles } from "../sprinkles";

type MenuTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  MenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixMenu.Trigger asChild ref={ref} {...sprinkleProps}>
      {asChild ? (
        children
      ) : (
        <Button icon={<IconAngleDown />} iconPosition="end" {...restProps}>
          {children}
        </Button>
      )}
    </RadixMenu.Trigger>
  );
});

DropdownMenuTrigger.displayName = "@optiaxiom/react/DropdownMenuTrigger";
