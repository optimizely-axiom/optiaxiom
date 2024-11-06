import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";

type ComboboxListProps = BoxProps<"ul">;

export const ComboboxList = forwardRef<HTMLUListElement, ComboboxListProps>(
  ({ children }, ref) => {
    const { downshift, items } = useComboboxContext("ComboboxList");
    if (!items.length) {
      return null;
    }

    return (
      <Box
        asChild
        display="flex"
        flex="1"
        flexDirection="column"
        gap="2"
        overflow="auto"
      >
        <ul {...downshift.getMenuProps({ ref })}>{children}</ul>
      </Box>
    );
  },
);

ComboboxList.displayName = "@optiaxiom/react/ComboboxList";
