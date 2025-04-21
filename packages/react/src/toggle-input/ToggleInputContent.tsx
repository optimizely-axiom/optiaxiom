import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ToggleInputContentProps = BoxProps<"div">;

export const ToggleInputContent = forwardRef<
  HTMLDivElement,
  ToggleInputContentProps
>(({ children, ...props }, ref) => {
  return (
    <Box flex="1" fontSize="md" overflow="hidden" ref={ref} {...props}>
      {children}
    </Box>
  );
});

ToggleInputContent.displayName = "@optiaxiom/react/ToggleInputContent";
