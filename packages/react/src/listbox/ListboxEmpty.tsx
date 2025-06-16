import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

export type ListboxEmptyProps = BoxProps;

export const ListboxEmpty = forwardRef<HTMLDivElement, ListboxEmptyProps>(
  ({ children = "No results found.", ...props }, ref) => {
    return (
      <Box
        alignItems="center"
        aria-hidden
        color="fg.tertiary"
        display="flex"
        flexDirection="column"
        fontSize="md"
        p="10"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

ListboxEmpty.displayName = "@optiaxiom/react/ListboxEmpty";
