import { type ComponentPropsWithRef, forwardRef } from "react";

import { ButtonProvider } from "../button/internals";
import { Group } from "../group";
import * as styles from "./AlertDialogFooter.css";

export type AlertDialogFooterProps = ComponentPropsWithRef<typeof Group>;

/**
 * @group AlertDialog
 */
export const AlertDialogFooter = forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ children, className, ...props }, ref) => {
  return (
    <ButtonProvider size="lg">
      <Group {...styles.footer({}, className)} ref={ref} {...props}>
        {children}
      </Group>
    </ButtonProvider>
  );
});

AlertDialogFooter.displayName = "@optiaxiom/react/AlertDialogFooter";
