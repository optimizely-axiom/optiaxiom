import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./CommandFooter.css";

type DialogFooterProps = ComponentPropsWithRef<typeof Flex>;

export const CommandFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.footer({}, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

CommandFooter.displayName = "@optiaxiom/react/CommandFooter";
