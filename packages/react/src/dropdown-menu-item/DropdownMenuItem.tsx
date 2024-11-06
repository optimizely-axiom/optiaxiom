import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import {
  ListboxItemBase,
  type ListboxItemBaseProps,
} from "../listbox-item-base";

type DropdownMenuItemProps = ListboxItemBaseProps<typeof RadixMenu.Item>;

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ children, onSelect, ...props }, ref) => {
  return (
    <ListboxItemBase ref={ref} {...props}>
      <RadixMenu.Item onSelect={onSelect}>{children}</RadixMenu.Item>
    </ListboxItemBase>
  );
});

DropdownMenuItem.displayName = "@optiaxiom/react/DropdownMenuItem";
