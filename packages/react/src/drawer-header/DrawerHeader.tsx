import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type DrawerHeaderProps = BoxProps;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        gap="8"
        p="24"
        pb="16"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

DrawerHeader.displayName = "@optiaxiom/react/DrawerHeader";
