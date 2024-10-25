import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ToggleInputLabelProps = BoxProps<"div">;

export const ToggleInputLabel = forwardRef<
  HTMLDivElement,
  ToggleInputLabelProps
>(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});

ToggleInputLabel.displayName = "@optiaxiom/react/ToggleInputLabel";
