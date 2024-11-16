import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type AutocompleteEmptyProps = BoxProps<"div">;

export const AutocompleteEmpty = forwardRef<
  HTMLDivElement,
  AutocompleteEmptyProps
>(({ children, ...props }, ref) => {
  return (
    <Box
      alignItems="center"
      color="fg.disabled"
      display="flex"
      flexDirection="column"
      fontSize="md"
      p="md"
      ref={ref}
      {...props}
    >
      {children || "No options"}
    </Box>
  );
});

AutocompleteEmpty.displayName = "@optiaxiom/react/AutocompleteEmpty";
