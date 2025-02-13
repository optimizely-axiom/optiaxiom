import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./ActionsContent.css";

type ActionsContentProps = BoxProps<"div">;

export const ActionsContent = forwardRef<HTMLDivElement, ActionsContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.content({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

ActionsContent.displayName = "@optiaxiom/react/ActionsContent";
