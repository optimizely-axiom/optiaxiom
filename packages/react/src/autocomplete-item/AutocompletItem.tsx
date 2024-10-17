import { forwardRef, type ReactNode } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { useAutocompleteListContext } from "../autocomplete-list-context";
import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";
import * as styles from "./AutocompleteItem.css";

type AutocompleteItemProps = BoxProps<
  "li",
  {
    addonBefore?: ReactNode;
  }
>;

export const AutocompleteItem = forwardRef<
  HTMLLIElement,
  AutocompleteItemProps
>(({ addonBefore, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { downshift, highlightedItem } =
    useAutocompleteContext("AutocompleteItem");
  const { item } = useAutocompleteListContext("AutocompleteItem");
  const itemProps = downshift.getItemProps({ item });

  return (
    <Flex asChild {...styles.item()} {...sprinkleProps}>
      <li
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        data-selected={downshift.selectedItem === item ? "" : undefined}
        ref={ref}
        {...restProps}
        {...itemProps}
      >
        {addonBefore && <Icon asChild>{fallbackSpan(addonBefore)}</Icon>}

        {children}
      </li>
    </Flex>
  );
});

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
