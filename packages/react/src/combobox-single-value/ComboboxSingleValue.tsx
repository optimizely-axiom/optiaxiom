import type { UseComboboxProps } from "downshift";

import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";

type ComboboxSingleValueProps = BoxProps<
  "div",
  {
    placeholder?: string;
    value: unknown;
  } & Pick<UseComboboxProps<unknown>, "itemToKey" | "itemToString">
>;

export const ComboboxSingleValue = forwardRef<
  HTMLDivElement,
  ComboboxSingleValueProps
>(({ children, placeholder, value, ...props }, ref) => {
  const { itemToString } = useComboboxContext("ComboboxSingleValue");

  return (
    <Box ref={ref} {...props}>
      {value ? (children ?? itemToString(value)) : placeholder}
    </Box>
  );
});

ComboboxSingleValue.displayName = "@optiaxiom/react/ComboboxSingleValue";
