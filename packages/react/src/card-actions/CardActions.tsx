import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./CardActions.css";

type CardActionsProps = BoxProps<"div">;

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.actions({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

CardActions.displayName = "@optiaxiom/react/CardActions";
