import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ListboxEmptyProps = BoxProps;

export const ListboxEmpty = forwardRef<HTMLDivElement, ListboxEmptyProps>(
  ({ children = "No results found.", ...props }, ref) => {
    return (
      <Box
        alignItems="center"
        color="fg.disabled"
        display="flex"
        flexDirection="column"
        fontSize="md"
        p="16"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

ListboxEmpty.displayName = "@optiaxiom/react/ListboxEmpty";
