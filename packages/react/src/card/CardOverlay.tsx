import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./CardOverlay.css";

export type CardOverlayProps = BoxProps;

export const CardOverlay = forwardRef<HTMLDivElement, CardOverlayProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.overlay({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

CardOverlay.displayName = "@optiaxiom/react/CardOverlay";
