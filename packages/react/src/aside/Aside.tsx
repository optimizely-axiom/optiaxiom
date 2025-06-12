import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Aside.css";

export type Aside = BoxProps<"div">;

export const Aside = forwardRef<HTMLDivElement, Aside>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.content({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

Aside.displayName = "@optiaxiom/react/Aside";
