import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { CommandItem } from "../command-item";

type AutocompleteItemProps = ComponentPropsWithoutRef<typeof CommandItem>;

export const AutocompleteItem = forwardRef<
  HTMLDivElement,
  AutocompleteItemProps
>((props, ref) => {
  const { selectedItem } = useAutocompleteContext("AutocompleteItem");
  return (
    <CommandItem ref={ref} selected={props.item === selectedItem} {...props} />
  );
});

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
