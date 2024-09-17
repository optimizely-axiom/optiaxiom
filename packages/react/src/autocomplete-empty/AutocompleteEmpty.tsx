import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type CommandProps = ComponentPropsWithRef<typeof Box>;

export const AutocompleteEmpty = forwardRef<HTMLDivElement, CommandProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        color="fg.disabled"
        display="flex"
        fontSize="lg"
        justifyContent="center"
        p="md"
        ref={ref}
        {...props}
      >
        {children || "No results found"}
      </Box>
    );
  },
);

AutocompleteEmpty.displayName = "@optiaxiom/react/AutocompleteEmpty";
