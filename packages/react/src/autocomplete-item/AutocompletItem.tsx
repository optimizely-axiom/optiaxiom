import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { useAutocompleteListContext } from "../autocomplete-list-context";
import {
  ListboxItemBase,
  type ListboxItemBaseProps,
} from "../listbox-item-base";
import { extractSprinkles } from "../sprinkles";

type AutocompleteItemProps = ListboxItemBaseProps<"li">;

export const AutocompleteItem = forwardRef<
  HTMLLIElement,
  AutocompleteItemProps
>(({ addonAfter, addonBefore, children, description, icon, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { downshift, highlightedItem } =
    useAutocompleteContext("AutocompleteItem");
  const { item } = useAutocompleteListContext("AutocompleteItem");
  const itemProps = downshift.getItemProps({ item });

  return (
    <ListboxItemBase
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      description={description}
      icon={icon}
      {...sprinkleProps}
    >
      <li
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        data-selected={downshift.selectedItem === item ? "" : undefined}
        ref={ref}
        {...restProps}
        {...itemProps}
      >
        {children}
      </li>
    </ListboxItemBase>
  );
});

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
