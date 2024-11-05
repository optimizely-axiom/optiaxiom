import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";

type ComboboxEmptyProps = BoxProps;

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  ({ children, ...props }, ref) => {
    const { items } = useComboboxContext("ComboboxEmpty");
    if (items.length > 0) {
      return null;
    }

    return (
      <Box
        alignItems="center"
        color="fg.disabled"
        display="flex"
        fontSize="md"
        justifyContent="center"
        p="md"
        ref={ref}
        {...props}
      >
        {children || "No options"}
      </Box>
    );
  },
);

ComboboxEmpty.displayName = "@optiaxiom/react/ComboboxEmpty";
