import { forwardRef } from "react";

import { ActionsContent } from "../actions";
import { type BoxProps } from "../box";
import * as styles from "./CardAction.css";

export type CardActionProps = BoxProps<"div">;

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ActionsContent ref={ref} {...styles.action({}, className)} {...props}>
        {children}
      </ActionsContent>
    );
  },
);

CardAction.displayName = "@optiaxiom/react/CardAction";
