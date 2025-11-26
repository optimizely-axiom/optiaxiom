import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef, useContext } from "react";

import { Button, type ButtonProps } from "../button";
import { DialogKitContext } from "../dialog-kit/internals";
import { useAlertDialogContext } from "./AlertDialogContext";

export type AlertDialogCancelProps = ButtonProps<typeof RadixDialog.Close>;

/**
 * @group AlertDialog
 * @extends Button
 */
export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(
  (
    { appearance = "subtle", asChild, children = "Cancel", onClick, ...props },
    outerRef,
  ) => {
    const { cancelRef } = useAlertDialogContext(
      "@optiaxiom/react/AlertDialogCancel",
    );
    const { onDismiss } = useContext(DialogKitContext) ?? {};
    const ref = useComposedRefs(cancelRef, outerRef);

    return (
      <RadixDialog.Close
        asChild
        onClick={(event) => {
          if (onDismiss) {
            onDismiss(event, "cancel");
            if (event.defaultPrevented) {
              return;
            }
          }
          onClick?.(event);
        }}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <Button appearance={appearance}>{children}</Button>
        )}
      </RadixDialog.Close>
    );
  },
);

AlertDialogCancel.displayName = "@optiaxiom/react/AlertDialogCancel";
