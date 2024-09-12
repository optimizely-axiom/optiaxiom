import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./ComboboxFooter.css";

type DialogFooterProps = ComponentPropsWithRef<typeof Flex>;

export const ComboboxFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.footer({}, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

ComboboxFooter.displayName = "@optiaxiom/react/ComboboxFooter";
