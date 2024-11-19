import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ListboxProps = BoxProps<"div">;

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        display="flex"
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
