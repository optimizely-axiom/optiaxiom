import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { ListboxCheckboxItem } from "../listbox-checkbox-item";
import { type ListboxItemProps } from "../listbox-item";

type DropdownMenuCheckboxItemProps = ListboxItemProps<
  typeof RadixMenu.CheckboxItem
>;

export const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ children, ...props }, ref) => {
  return (
    <RadixMenu.CheckboxItem asChild ref={ref} {...props}>
      <ListboxCheckboxItem>{children}</ListboxCheckboxItem>
    </RadixMenu.CheckboxItem>
  );
});

DropdownMenuCheckboxItem.displayName =
  "@optiaxiom/react/DropdownMenuCheckboxItem";
