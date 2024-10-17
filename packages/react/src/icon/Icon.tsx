import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type IconProps = ComponentPropsWithRef<typeof Box>;

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box h="16" ref={ref} w="auto" {...props}>
        {children}
      </Box>
    );
  },
);

Icon.displayName = "@optiaxiom/react/Icon";
