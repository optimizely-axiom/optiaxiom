import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { type ListboxItemProps } from "../listbox-item";
import { ListboxRadioItem } from "../listbox-radio-item";

type DropdownMenuCheckboxItemProps = ListboxItemProps<
  typeof RadixMenu.CheckboxItem
>;

export const DropdownMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(
  (
    { asChild, checked, children, onCheckedChange, onSelect, ...props },
    ref,
  ) => {
    return (
      <ListboxRadioItem
        aria-selected={checked === true}
        asChild
        ref={ref}
        {...props}
      >
        <RadixMenu.CheckboxItem
          asChild={asChild}
          checked={checked}
          onCheckedChange={onCheckedChange}
          onSelect={onSelect}
        >
          {children}
        </RadixMenu.CheckboxItem>
      </ListboxRadioItem>
    );
  },
);

DropdownMenuCheckboxItem.displayName =
  "@optiaxiom/react/DropdownMenuCheckboxItem";
