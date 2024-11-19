import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ListboxEmptyProps = BoxProps;

export const ListboxEmpty = forwardRef<HTMLDivElement, ListboxEmptyProps>(
  ({ children, ...props }, ref) => {
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
  },
);

ListboxEmpty.displayName = "@optiaxiom/react/ListboxEmpty";
