import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";
import * as styles from "./DialogBody.css";

export type DialogBodyProps = ComponentPropsWithRef<typeof Box>;

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.body({}, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogBody";
