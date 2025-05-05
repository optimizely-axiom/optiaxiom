import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

export type ListboxProps = BoxProps<"div">;

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        gap="2"
        overflow="auto"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Listbox.displayName = "@optiaxiom/react/Listbox";
