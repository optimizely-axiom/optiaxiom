import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./DialogBody.css";

type DialogBodyProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  { children: ReactNode }
>;

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.body()} {...props}>
        {children}
      </Box>
    );
  },
);

DialogBody.displayName = "@optiaxiom/react/DialogScrollableContent";
