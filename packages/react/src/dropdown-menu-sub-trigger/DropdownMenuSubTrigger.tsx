import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { IconAngleRight } from "../icons/IconAngleRight";
import { MenuItemBase, type MenuItemBaseProps } from "../menu-item-base";

type MenuSubTriggerProps = MenuItemBaseProps<typeof RadixMenu.SubTrigger>;

export const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  MenuSubTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <MenuItemBase endDecorator={<IconAngleRight />} ref={ref} {...props}>
      <RadixMenu.SubTrigger>{children}</RadixMenu.SubTrigger>
    </MenuItemBase>
  );
});

DropdownMenuSubTrigger.displayName = "@optiaxiom/react/DropdownMenuSubTrigger";
