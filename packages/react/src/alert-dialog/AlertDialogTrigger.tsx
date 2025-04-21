import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type AlertDialogTriggerProps = ButtonProps<typeof RadixAlertDialog.Trigger>;

export const AlertDialogTrigger = forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <RadixAlertDialog.Trigger asChild ref={ref} {...props}>
      {asChild ? children : <Button>{children}</Button>}
    </RadixAlertDialog.Trigger>
  );
});

AlertDialogTrigger.displayName = "@optiaxiom/react/AlertDialogTrigger";
