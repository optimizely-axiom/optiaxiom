import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./DialogBody.css";

type DialogBodyProps = ComponentPropsWithRef<typeof Box>;

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.body()} {...props}>
        {children}
      </Box>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogBody";
