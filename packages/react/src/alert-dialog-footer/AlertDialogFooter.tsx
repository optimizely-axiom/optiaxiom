import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import * as styles from "./AlertDialogFooter.css";

type AlertDialogFooterProps = ComponentPropsWithRef<typeof Flex>;

export const AlertDialogFooter = forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <Flex {...styles.footer({}, className)} ref={ref} {...props}>
      {children}
    </Flex>
  );
});

AlertDialogFooter.displayName = "@optiaxiom/react/AlertDialogFooter";
