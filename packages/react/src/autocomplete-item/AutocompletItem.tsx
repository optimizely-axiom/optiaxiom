import { type ReactNode, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { AutocompleteItemContextProvider } from "../autocomplete-item-context";
import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";
import * as styles from "./AutocompleteItem.css";

type AutocompleteItemProps = BoxProps<
  "li",
  {
    addonAfter?: ReactNode;
    addonBefore?: ReactNode;
    item: unknown;
  }
>;

export const AutocompleteItem = forwardRef<
  HTMLLIElement,
  AutocompleteItemProps
>(({ addonAfter, addonBefore, children, item, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { downshift, highlightedItem } =
    useAutocompleteContext("AutocompleteItem");
  const itemProps = downshift.getItemProps({ item });

  return (
    <AutocompleteItemContextProvider active={downshift.selectedItem === item}>
      <Flex asChild {...styles.item()} {...sprinkleProps}>
        <li
          data-disabled={itemProps["aria-disabled"] ? "" : undefined}
          data-highlighted={highlightedItem === item ? "" : undefined}
          data-selected={downshift.selectedItem === item ? "" : undefined}
          ref={ref}
          {...restProps}
          {...itemProps}
        >
          {addonBefore && <Icon>{fallbackSpan(addonBefore)}</Icon>}

          {children}

          {addonAfter && <Icon>{fallbackSpan(addonAfter)}</Icon>}
        </li>
      </Flex>
    </AutocompleteItemContextProvider>
  );
});

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
