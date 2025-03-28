import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";
import { ListboxItem } from "../listbox-item";

type DropdownMenuAutocompleteItemProps = ComponentPropsWithoutRef<
  typeof CommandItem
> &
  ComponentPropsWithoutRef<typeof ListboxItem>;

export const DropdownMenuAutocompleteItem = forwardRef<
  HTMLDivElement,
  DropdownMenuAutocompleteItemProps
>(({ children, ...props }, ref) => {
  return (
    <CommandItem asChild ref={ref} {...props}>
      <ListboxItem>{children}</ListboxItem>
    </CommandItem>
  );
});

DropdownMenuAutocompleteItem.displayName =
  "@optiaxiom/react/DropdownMenuAutocompleteItem";
