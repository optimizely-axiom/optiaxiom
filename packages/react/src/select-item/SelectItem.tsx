import { forwardRef, type ReactNode } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { useSelectContext } from "../select-context";
import { SelectItemContextProvider } from "../select-item-context";
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
    const { downshift, highlightedItem, selectedItem } =
      useSelectContext("SelectItem");

    const itemProps = downshift.getItemProps({ item });

    return (
      <SelectItemContextProvider active={selectedItem === item}>
        <Flex asChild {...styles.item()} {...sprinkleProps}>
          <li
            data-disabled={itemProps["aria-disabled"] ? "" : undefined}
            data-highlighted={highlightedItem === item ? "" : undefined}
            data-selected={selectedItem === item ? "" : undefined}
            ref={ref}
            {...restProps}
            {...itemProps}
          >
            {addonBefore && <Icon>{fallbackSpan(addonBefore)}</Icon>}

            {children}
          </li>
        </Flex>
      </SelectItemContextProvider>
    );
  },
);

SelectItem.displayName = "@optiaxiom/react/SelectItem";
