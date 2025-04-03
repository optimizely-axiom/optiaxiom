import { forwardRef, type MouseEvent } from "react";

import { Box, type BoxProps } from "../box";
import { useSelectContext } from "../select-context";

type SelectItemProps = BoxProps<
  "div",
  {
    /**
     * The exact item element from the collection.
     */
    item: unknown;
  }
>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, item, onMouseMove, size, ...props }, ref) => {
    const { downshift, highlightedItem, isOpen, selectedItem } =
      useSelectContext("@optiaxiom/react/SelectItem");

    const itemProps = downshift.getItemProps({
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
