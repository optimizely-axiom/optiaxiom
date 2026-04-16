import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./Icon.css";

export type IconProps = ComponentPropsWithRef<typeof Box>;

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.icon({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

Icon.displayName = "@optiaxiom/react/Icon";
