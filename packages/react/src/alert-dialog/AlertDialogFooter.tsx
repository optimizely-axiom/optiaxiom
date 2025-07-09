import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonProvider } from "../button/internals";
import { Flex } from "../flex";
import * as styles from "./AlertDialogFooter.css";

export type AlertDialogFooterProps = ComponentPropsWithRef<typeof Flex>;

export const AlertDialogFooter = forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <ButtonProvider size="lg">
      <Flex {...styles.footer({}, className)} ref={ref} {...props}>
        {children}
      </Flex>
    </ButtonProvider>
  );
});

AlertDialogFooter.displayName = "@optiaxiom/react/AlertDialogFooter";
