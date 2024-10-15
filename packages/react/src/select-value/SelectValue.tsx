import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSelectContext } from "../select-context";

type SelectValueProps = BoxProps<"div", { placeholder?: string }>;

export const SelectValue = forwardRef<HTMLDivElement, SelectValueProps>(
  ({ children, placeholder, ...props }, ref) => {
    const { itemToString, selectedItem } = useSelectContext("SelectValue");
    return (
      <Box {...props} ref={ref}>
        {children ?? (selectedItem ? itemToString(selectedItem) : placeholder)}
      </Box>
    );
  },
);

SelectValue.displayName = "@optiaxiom/react/SelectValue";
