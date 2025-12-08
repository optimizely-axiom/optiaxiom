import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Group } from "../group";
import * as styles from "./DialogBody.css";

export type DialogBodyProps = ComponentPropsWithRef<typeof Box>;

/**
 * @group Dialog
 */
export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Group ref={ref} {...styles.body({}, className)} {...props}>
        {children}
      </Group>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogBody";
