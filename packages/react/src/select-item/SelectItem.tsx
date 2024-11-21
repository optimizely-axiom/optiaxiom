import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSelectContext } from "../select-context";
import { extractSprinkles } from "../sprinkles";

type SelectItemProps = BoxProps<
  "div",
  {
    item: unknown;
  }
>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, item, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift, highlightedItem, selectedItem } =
      useSelectContext("SelectItem");

    const itemProps = downshift.getItemProps({ item, ...restProps });

    return (
      <Box
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        data-selected={selectedItem === item ? "" : undefined}
        ref={ref}
        {...sprinkleProps}
        {...itemProps}
      >
        {children}
      </Box>
    );
  },
);

SelectItem.displayName = "@optiaxiom/react/SelectItem";
