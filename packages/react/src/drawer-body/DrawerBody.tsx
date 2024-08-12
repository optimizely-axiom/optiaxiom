import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./DrawerBody.css";

type DrawerBodyProps = ComponentPropsWithRef<typeof Box>;

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.body({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

DrawerBody.displayName = "@optiaxiom/react/DrawerBody";
