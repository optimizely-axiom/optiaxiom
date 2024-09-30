import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { MenuButton } from "../menu-button";
import { extractSprinkles } from "../sprinkles";

type MenuTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  MenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixMenu.Trigger asChild ref={ref} {...sprinkleProps}>
      {asChild ? children : <MenuButton {...restProps}>{children}</MenuButton>}
    </RadixMenu.Trigger>
  );
});

DropdownMenuTrigger.displayName = "@optiaxiom/react/DropdownMenuTrigger";
