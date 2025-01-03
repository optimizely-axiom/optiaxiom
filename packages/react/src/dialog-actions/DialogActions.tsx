import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./DialogActions.css";

type DialogActionsProps = BoxProps;

export const DialogActions = forwardRef<HTMLHeadingElement, DialogActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.actions({}, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

DialogActions.displayName = "@optiaxiom/react/DialogActions";
