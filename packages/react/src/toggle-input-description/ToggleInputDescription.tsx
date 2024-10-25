import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ToggleInputDescriptionProps = BoxProps<"div">;

export const ToggleInputDescription = forwardRef<
  HTMLDivElement,
  ToggleInputDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <Box color="fg.secondary" fontSize="sm" ref={ref} {...props}>
      {children}
    </Box>
  );
});

ToggleInputDescription.displayName = "@optiaxiom/react/ToggleInputDescription";
