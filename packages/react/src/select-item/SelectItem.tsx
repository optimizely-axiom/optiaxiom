import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconCheck } from "../icons/IconCheck";
import { useSelectContext } from "../select-context";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";
import * as styles from "./SelectItem.css";

type SelectItemProps = BoxProps<
  "li",
  {
    addonBefore?: ReactNode;
    item: unknown;
  }
>;

export const SelectItem = forwardRef<HTMLLIElement, SelectItemProps>(
  ({ addonBefore, children, item, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, highlightedItem } = useSelectContext("SelectItem");

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
  },
);

SelectItem.displayName = "@optiaxiom/react/SelectItem";
