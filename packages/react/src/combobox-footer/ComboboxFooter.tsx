import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./ComboboxFooter.css";

type ComboboxFooterProps = ComponentPropsWithRef<typeof Flex>;

export const ComboboxFooter = forwardRef<HTMLDivElement, ComboboxFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex asChild ref={ref} {...styles.footer({}, className)} {...props}>
        <li>{children}</li>
      </Flex>
    );
  },
);

ComboboxFooter.displayName = "@optiaxiom/react/ComboboxFooter";
