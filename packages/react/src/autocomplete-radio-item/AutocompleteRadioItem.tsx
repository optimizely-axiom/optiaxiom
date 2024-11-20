import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { AutocompleteItem } from "../autocomplete-item";
import { ListboxRadioItem } from "../listbox-radio-item";

type AutocompleteRadioItemProps = ComponentPropsWithoutRef<
  typeof AutocompleteItem
> &
  ComponentPropsWithoutRef<typeof ListboxRadioItem>;

export const AutocompleteRadioItem = forwardRef<
  HTMLDivElement,
  AutocompleteRadioItemProps
>(({ children, ...props }, ref) => {
  return (
    <AutocompleteItem asChild ref={ref} {...props}>
      <ListboxRadioItem>{children}</ListboxRadioItem>
    </AutocompleteItem>
  );
});

AutocompleteRadioItem.displayName = "@optiaxiom/react/AutocompleteRadioItem";
