import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type StrongProps = ComponentPropsWithRef<typeof Box>;

export const Strong = forwardRef<HTMLElement, StrongProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box asChild fontWeight="700" {...props}>
        <strong ref={ref}>{children}</strong>
      </Box>
    );
  },
);

Strong.displayName = "@optiaxiom/react/Strong";
