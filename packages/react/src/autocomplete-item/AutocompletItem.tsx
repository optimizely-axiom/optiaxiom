import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { AutocompleteItemContextProvider } from "../autocomplete-item-context";
import {
  ListboxItemBase,
  type ListboxItemBaseProps,
} from "../listbox-item-base";
import { extractSprinkles } from "../sprinkles";

type AutocompleteItemProps = ListboxItemBaseProps<
  "li",
  {
    item: unknown;
  }
>;

export const AutocompleteItem = forwardRef<
  HTMLLIElement,
  AutocompleteItemProps
>(
  (
    { addonAfter, addonBefore, children, description, icon, item, ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, highlightedItem } =
      useAutocompleteContext("AutocompleteItem");
    const itemProps = downshift.getItemProps({ item });

    return (
      <AutocompleteItemContextProvider
        active={downshift.selectedItem === item}
        item={item}
      >
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
      </AutocompleteItemContextProvider>
    );
  },
);

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
