import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type AlertDescriptionProps = ComponentPropsWithRef<typeof Box>;

export const AlertDescription = forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <Box fontSize="md" fontWeight="400" ref={ref} {...props}>
      {children}
    </Box>
  );
});

AlertDescription.displayName = "@optiaxiom/react/AlertDescription";
