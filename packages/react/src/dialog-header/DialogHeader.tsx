import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type DialogHeaderProps = BoxProps;

export const DialogHeader = forwardRef<HTMLHeadingElement, DialogHeaderProps>(
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

DialogHeader.displayName = "@optiaxiom/react/DialogHeader";
