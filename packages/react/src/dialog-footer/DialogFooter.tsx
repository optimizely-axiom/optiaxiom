import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./DialogFooter.css";

type FooterProps = ComponentPropsWithRef<typeof Flex>;

export const DialogFooter = forwardRef<HTMLDivElement, FooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.footer()} {...props}>
        {children}
      </Flex>
    );
  },
);

DialogFooter.displayName = "@optiaxiom/react/DialogFooter";
