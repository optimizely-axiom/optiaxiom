import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, type MouseEvent } from "react";

import { Box, type BoxProps } from "../box";
import { type SelectOption, useSelectContext } from "./SelectContext";

export type SelectItemProps = BoxProps<
  "div",
  {
    /**
     * The index of the item element within the collection.
     */
    index: number;
    /**
     * The exact item element from the collection.
     */
    item: SelectOption;
  }
>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, index, item, onMouseMove, size, ...props }, outerRef) => {
    const {
      downshift,
      highlightedItem,
      highlightedItemRef,
      isOpen,
      items,
      selectedItem,
    } = useSelectContext("@optiaxiom/react/SelectItem");
    const ref = useComposedRefs(
      highlightedItem === item ? highlightedItemRef : undefined,
      outerRef,
    );

    const itemProps = downshift.getItemProps({
      "aria-posinset": index + 1,
      "aria-setsize": items.length,
      item,
      onMouseMove: (event: MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(event);
        if (event.defaultPrevented) {
          return;
        }

        /**
         * Downshift listens to mousemove on items and disables scrolling to
         * highlighted items (since should only scroll when using keyboard).
         *
         * But since we use exit animations downshift menu is present in DOM
         * while closing - and we need to prevent triggering mousemove during
         * that time.
         */
        if (!isOpen) {
          event.preventDefault();
          Object.assign(event.nativeEvent, {
            preventDownshiftDefault: true,
          });
        }
      },
      ref,
      ...props,
    });

    return (
      <Box
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        data-selected={selectedItem === item ? "" : undefined}
        size={size}
        {...itemProps}
      >
        {children}
      </Box>
    );
  },
);

SelectItem.displayName = "@optiaxiom/react/SelectItem";
