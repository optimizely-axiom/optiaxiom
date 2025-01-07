import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type AlertDialogActionProps = ButtonProps<typeof RadixAlertDialog.Action>;

export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(
  (
    { appearance = "danger", asChild, children, size = "lg", ...props },
    ref,
  ) => {
    return (
      <RadixAlertDialog.Action asChild ref={ref} {...props}>
        {asChild ? (
          children
        ) : (
          <Button appearance={appearance} size={size}>
            {children}
          </Button>
        )}
      </RadixAlertDialog.Action>
    );
  },
);

AlertDialogAction.displayName = "@optiaxiom/react/AlertDialogAction";
