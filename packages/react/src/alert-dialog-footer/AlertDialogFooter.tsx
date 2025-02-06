import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonContextProvider } from "../button-context";
import { Flex } from "../flex";
import * as styles from "./AlertDialogFooter.css";

type AlertDialogFooterProps = ComponentPropsWithRef<typeof Flex>;

export const AlertDialogFooter = forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <Flex {...styles.footer({}, className)} ref={ref} {...props}>
      <ButtonContextProvider size="lg">{children}</ButtonContextProvider>
    </Flex>
  );
});

AlertDialogFooter.displayName = "@optiaxiom/react/AlertDialogFooter";
