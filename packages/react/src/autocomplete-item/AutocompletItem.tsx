import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { useAutocompleteListContext } from "../autocomplete-list-context";
import { MenuItemBase, type MenuItemBaseProps } from "../menu-item-base";
import { extractSprinkles } from "../sprinkles";

type AutocompleteItemProps = MenuItemBaseProps<"li">;

export const AutocompleteItem = forwardRef<
  HTMLLIElement,
  AutocompleteItemProps
>(({ addonAfter, addonBefore, children, description, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { downshift, highlightedItem } =
    useAutocompleteContext("AutocompleteItem");
  const { item } = useAutocompleteListContext("AutocompleteItem");
  const itemProps = downshift.getItemProps({ item });

  return (
    <MenuItemBase
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      description={description}
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
    </MenuItemBase>
  );
});

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
