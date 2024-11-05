import { forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

type AutocompleteEmptyProps = BoxProps<"li">;

export const AutocompleteEmpty = forwardRef<
  HTMLLIElement,
  AutocompleteEmptyProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  const { items } = useAutocompleteContext("AutocompleteEmpty");
  if (items.length > 0) {
    return null;
  }

  return (
    <Box
      asChild
      color="fg.disabled"
      display="flex"
      fontSize="md"
      justifyContent="center"
      p="md"
      {...sprinkleProps}
    >
      <li ref={ref} {...restProps}>
        {children || "No options"}
      </li>
    </Box>
  );
});

AutocompleteEmpty.displayName = "@optiaxiom/react/AutocompleteEmpty";
