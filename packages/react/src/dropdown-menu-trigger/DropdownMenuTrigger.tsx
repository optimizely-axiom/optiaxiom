import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { MenuButton } from "../menu-button";

type MenuTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  MenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <RadixMenu.Trigger asChild ref={ref} {...props}>
      {asChild ? children : <MenuButton>{children}</MenuButton>}
    </RadixMenu.Trigger>
  );
});

DropdownMenuTrigger.displayName = "@optiaxiom/react/DropdownMenuTrigger";
