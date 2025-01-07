import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type AlertDialogCancelProps = ButtonProps<typeof RadixAlertDialog.Cancel>;

export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(
  (
    {
      appearance = "subtle",
      asChild,
      children = "Cancel",
      size = "lg",
      ...props
    },
    ref,
  ) => {
    return (
      <RadixAlertDialog.Cancel asChild ref={ref} {...props}>
        {asChild ? (
          children
        ) : (
          <Button appearance={appearance} size={size}>
            {children}
          </Button>
        )}
      </RadixAlertDialog.Cancel>
    );
  },
);

AlertDialogCancel.displayName = "@optiaxiom/react/AlertDialogCancel";
