import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";

type MenuTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <RadixMenu.Trigger asChild ref={ref} {...props}>
        {asChild ? (
          children
        ) : (
          <Button icon={<IconAngleDown />} iconPosition="end">
            {children}
          </Button>
        )}
      </RadixMenu.Trigger>
    );
  },
);

MenuTrigger.displayName = "@optiaxiom/react/MenuTrigger";
