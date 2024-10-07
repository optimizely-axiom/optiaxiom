import { type ReactNode, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { AutocompleteItemContextProvider } from "../autocomplete-item-context";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
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

  return (
    <AutocompleteItemContextProvider active={downshift.selectedItem === item}>
      <Flex asChild {...styles.item()} {...sprinkleProps}>
        <li
          data-disabled={
            downshift.getItemProps({ item })["aria-disabled"] ? "" : undefined
          }
          data-highlighted={highlightedItem === item ? "" : undefined}
          data-selected={downshift.selectedItem === item ? "" : undefined}
          ref={ref}
          {...restProps}
          {...downshift.getItemProps({
            item,
          })}
        >
          {addonBefore && (
            <Box asChild h="16" w="auto">
              {fallbackSpan(addonBefore)}
            </Box>
          )}

          {children}

          {addonBefore && (
            <Box asChild h="16" w="auto">
              {fallbackSpan(addonAfter)}
            </Box>
          )}
        </li>
      </Flex>
    </AutocompleteItemContextProvider>
  );
});

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
