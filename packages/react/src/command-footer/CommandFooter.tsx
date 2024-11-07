import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./CommandFooter.css";

type CommandFooterProps = ComponentPropsWithRef<typeof Flex>;

export const CommandFooter = forwardRef<HTMLDivElement, CommandFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex asChild ref={ref} {...styles.footer({}, className)} {...props}>
        <li>{children}</li>
      </Flex>
    );
  },
);

CommandFooter.displayName = "@optiaxiom/react/CommandFooter";
