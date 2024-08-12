import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./DrawerFooter.css";

type FooterProps = ComponentPropsWithRef<typeof Flex>;

export const DrawerFooter = forwardRef<HTMLDivElement, FooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.footer({}, className)} {...props}>
        {children}
      </Flex>
    );
  },
);

DrawerFooter.displayName = "@optiaxiom/react/DrawerFooter";
