import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type DialogHeaderProps = BoxProps;

export const DialogHeader = forwardRef<HTMLHeadingElement, DialogHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box p="lg" pb="md" ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

DialogHeader.displayName = "@optiaxiom/react/DialogHeader";
