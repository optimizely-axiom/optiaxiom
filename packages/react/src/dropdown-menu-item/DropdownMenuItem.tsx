import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { MenuItemBase, type MenuItemBaseProps } from "../menu-item-base";

type DropdownMenuItemProps = MenuItemBaseProps<typeof RadixMenu.Item>;

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ children, onSelect, ...props }, ref) => {
  return (
    <MenuItemBase ref={ref} {...props}>
      <RadixMenu.Item onSelect={onSelect}>{children}</RadixMenu.Item>
    </MenuItemBase>
  );
});

DropdownMenuItem.displayName = "@optiaxiom/react/DropdownMenuItem";
