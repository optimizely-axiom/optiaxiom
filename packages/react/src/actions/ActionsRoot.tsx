import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./ActionsRoot.css";

export type ActionsRootProps = BoxProps<"div">;

export const ActionsRoot = forwardRef<HTMLDivElement, ActionsRootProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.root({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

ActionsRoot.displayName = "@optiaxiom/react/ActionsRoot";
