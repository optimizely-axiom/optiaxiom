import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";
import { DropdownMenuAutocompleteItem } from "../dropdown-menu-autocomplete-item";

type DropdownMenuAutocompleteListboxProps = ComponentPropsWithoutRef<
  typeof CommandListbox
>;

export const DropdownMenuComboboxListbox = forwardRef<
  HTMLDivElement,
  DropdownMenuAutocompleteListboxProps
>(({ children, ...props }, ref) => {
  const { items, itemToLabel } = useCommandContext(
    "@optiaxiom/react/DropdownMenuComboboxListbox",
  );

  return (
    <CommandListbox ref={ref} {...props}>
      {children ??
        items.map((item) => (
          <DropdownMenuAutocompleteItem item={item} key={item}>
            {itemToLabel(item)}
          </DropdownMenuAutocompleteItem>
        ))}
    </CommandListbox>
  );
});

DropdownMenuComboboxListbox.displayName =
  "@optiaxiom/react/DropdownMenuComboboxListbox";
