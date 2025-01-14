import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./CardOverflow.css";

type CardOverflowProps = ComponentPropsWithRef<typeof Box>;

export const CardOverflow = forwardRef<HTMLDivElement, CardOverflowProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.cardOverflow({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

CardOverflow.displayName = "@optiaxiom/react/CardOverflow";
