import { type ReactNode, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconCheck } from "../icons/IconCheck";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";
import * as styles from "./AutocompleteItem.css";

type AutocompleteItemProps = BoxProps<
  "li",
  {
    addonBefore?: ReactNode;
    item: unknown;
  }
>;

export const AutocompleteItem = forwardRef<
  HTMLLIElement,
  AutocompleteItemProps
>(({ addonBefore, children, item, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { downshift, highlightedItem } =
    useAutocompleteContext("AutocompleteItem");

  return (
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

        {downshift.selectedItem === item && <IconCheck />}
      </li>
    </Flex>
  );
});

AutocompleteItem.displayName = "@optiaxiom/react/AutocompleteItem";
