import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef, useContext } from "react";

import { Button, type ButtonProps } from "../button";
import { DialogKitContext } from "../dialog-kit/internals";

export type AlertDialogActionProps = ButtonProps<typeof RadixDialog.Close>;

/**
 * @group AlertDialog

 * @extends Button
 */
export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ appearance = "danger", asChild, children, onClick, ...props }, ref) => {
  const { onDismiss } = useContext(DialogKitContext) ?? {};

  return (
    <RadixDialog.Close
      asChild
      onClick={(event) => {
        if (onDismiss) {
          onDismiss(event, "action");
          if (event.defaultPrevented) {
            return;
          }
        }
        onClick?.(event);
      }}
      ref={ref}
      {...props}
    >
      {asChild ? children : <Button appearance={appearance}>{children}</Button>}
    </RadixDialog.Close>
  );
});

AlertDialogAction.displayName = "@optiaxiom/react/AlertDialogAction";
