import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";

type ComboboxSingleValueProps = BoxProps<"div", { placeholder?: string }>;

export const ComboboxSingleValue = forwardRef<
  HTMLDivElement,
  ComboboxSingleValueProps
>(({ children, placeholder, ...props }, ref) => {
  const { itemToString, value } = useComboboxContext("ComboboxSingleValue");
  return (
    <Box ref={ref} {...props}>
      {value ? (children ?? itemToString(value)) : placeholder}
    </Box>
  );
});

ComboboxSingleValue.displayName = "@optiaxiom/react/ComboboxSingleValue";
