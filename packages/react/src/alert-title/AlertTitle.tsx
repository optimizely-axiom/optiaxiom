import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type AlertTitleProps = ComponentPropsWithRef<typeof Box>;

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box fontWeight="600" ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

AlertTitle.displayName = "@optiaxiom/react/AlertTitle";
