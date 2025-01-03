import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSelectContext } from "../select-context";

type SelectItemProps = BoxProps<
  "div",
  {
    item: unknown;
  }
>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, item, size, ...props }, ref) => {
    const { downshift, highlightedItem, selectedItem } =
      useSelectContext("SelectItem");

    const itemProps = downshift.getItemProps({ item, ...props });

    return (
      <Box
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        data-selected={selectedItem === item ? "" : undefined}
        ref={ref}
        size={size}
        {...itemProps}
      >
        {children}
      </Box>
    );
  },
);

SelectItem.displayName = "@optiaxiom/react/SelectItem";
