import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type AutocompleteListProps = BoxProps<"ul">;

export const AutocompleteList = forwardRef<
  HTMLUListElement,
  AutocompleteListProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  const { downshift, items } = useAutocompleteContext("AutocompleteList");
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
});

AutocompleteList.displayName = "@optiaxiom/react/AutocompleteList";
