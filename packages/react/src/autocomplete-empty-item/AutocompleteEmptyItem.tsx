import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type AutocompleteEmptyItemProps = ComponentPropsWithRef<typeof Box>;

export const AutocompleteEmptyItem = forwardRef<
  HTMLLIElement,
  AutocompleteEmptyItemProps
>(({ children, ...props }, ref) => {
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
