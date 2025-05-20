import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./ActionsContent.css";

export type ActionsContentProps = BoxProps<"div", styles.ContentVariants>;

export const ActionsContent = forwardRef<HTMLDivElement, ActionsContentProps>(
  ({ children, className, visible = "if-needed", ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.content({ visible }, className)} {...props}>
        {children}
      </Box>
    );
  },
);

ActionsContent.displayName = "@optiaxiom/react/ActionsContent";
