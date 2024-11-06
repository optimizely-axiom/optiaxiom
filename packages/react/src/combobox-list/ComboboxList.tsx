import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useComboboxContext } from "../combobox-context";
import { extractSprinkles } from "../sprinkles";

type ComboboxListProps = BoxProps<"ul">;

export const ComboboxList = forwardRef<HTMLUListElement, ComboboxListProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

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
        {...sprinkleProps}
      >
        <ul {...downshift.getMenuProps({ ref, ...restProps })}>{children}</ul>
      </Box>
    );
  },
);

ComboboxList.displayName = "@optiaxiom/react/ComboboxList";
