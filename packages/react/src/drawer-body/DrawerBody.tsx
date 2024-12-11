import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type DrawerBodyProps = ComponentPropsWithRef<typeof Box>;

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        flex="1"
        fontSize="md"
        overflow="auto"
        px="24"
        py="16"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

DrawerBody.displayName = "@optiaxiom/react/DrawerBody";
