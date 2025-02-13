import { forwardRef } from "react";

import { ActionsContent } from "../actions-content";
import { type BoxProps } from "../box";
import * as styles from "./CardActions.css";

type CardActionsProps = BoxProps<"div">;

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ActionsContent ref={ref} {...styles.actions({}, className)} {...props}>
        {children}
      </ActionsContent>
    );
  },
);

CardActions.displayName = "@optiaxiom/react/CardActions";
