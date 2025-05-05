import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { type ListboxItemProps, ListboxSwitchItem } from "../listbox";

export type DropdownMenuCheckboxItemProps = ListboxItemProps<
  typeof RadixMenu.CheckboxItem
>;

export const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ children, ...props }, ref) => {
  return (
    <RadixMenu.CheckboxItem asChild ref={ref} {...props}>
      <ListboxSwitchItem>{children}</ListboxSwitchItem>
    </RadixMenu.CheckboxItem>
  );
});

DropdownMenuCheckboxItem.displayName =
  "@optiaxiom/react/DropdownMenuCheckboxItem";
