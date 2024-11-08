import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";

type AutocompleteEmptyProps = BoxProps<"div">;

export const AutocompleteEmpty = forwardRef<
  HTMLDivElement,
  AutocompleteEmptyProps
>(({ children, ...props }, ref) => {
  const { items } = useAutocompleteContext("AutocompleteEmpty");
  if (items.length > 0) {
    return null;
  }

  return (
    <Box
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
});

AutocompleteEmpty.displayName = "@optiaxiom/react/AutocompleteEmpty";
