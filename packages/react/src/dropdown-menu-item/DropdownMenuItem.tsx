import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { ListboxItem, type ListboxItemProps } from "../listbox-item";

type DropdownMenuItemProps = ListboxItemProps<typeof RadixMenu.Item>;

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ children, onSelect, ...props }, ref) => {
  return (
    <ListboxItem asChild ref={ref} {...props}>
      <RadixMenu.Item onSelect={onSelect}>{children}</RadixMenu.Item>
    </ListboxItem>
  );
});

DropdownMenuItem.displayName = "@optiaxiom/react/DropdownMenuItem";
