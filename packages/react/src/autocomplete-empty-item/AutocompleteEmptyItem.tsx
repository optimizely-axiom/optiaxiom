import { type ComponentPropsWithRef, forwardRef } from "react";

import { useAutocompleteContext } from "../autocomplete-context";
import { Box } from "../box";

type AutocompleteEmptyItemProps = ComponentPropsWithRef<typeof Box>;

export const AutocompleteEmptyItem = forwardRef<
  HTMLLIElement,
  AutocompleteEmptyItemProps
>(({ children, ...props }, ref) => {
  const { items } = useAutocompleteContext("AutocompleteEmptyItem");
  if (items.length > 0) {
    return null;
  }

  return (
    <Box
      asChild
      color="fg.disabled"
      display="flex"
      fontSize="lg"
      justifyContent="center"
      p="md"
      {...props}
    >
      <li ref={ref}> {children || "No results found"}</li>
    </Box>
  );
});

AutocompleteEmptyItem.displayName = "@optiaxiom/react/AutocompleteEmptyItem";
