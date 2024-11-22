import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type DrawerHeaderProps = BoxProps;

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        gap="xs"
        p="lg"
        pb="md"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

DrawerHeader.displayName = "@optiaxiom/react/DrawerHeader";
