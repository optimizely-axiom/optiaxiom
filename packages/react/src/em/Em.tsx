import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type EmProps = ComponentPropsWithRef<typeof Box>;

export const Em = forwardRef<HTMLElement, EmProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box asChild fontStyle="italic" {...props}>
        <em ref={ref}>{children}</em>
      </Box>
    );
  },
);

Em.displayName = "@optiaxiom/react/Em";
