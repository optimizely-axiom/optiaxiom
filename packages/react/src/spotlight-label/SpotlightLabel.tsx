import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type SpotlightLabelProps = BoxProps;

export const SpotlightLabel = forwardRef<HTMLDivElement, SpotlightLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        color="fg.default"
        fontSize="lg"
        fontWeight="600"
        pb="12"
        pt="16"
        px="24"
        ref={ref}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

SpotlightLabel.displayName = "@optiaxiom/react/SpotlightLabel";
