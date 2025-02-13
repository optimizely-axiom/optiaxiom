import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { useAlertDialogContext } from "../alert-dialog-context";
import { Button, type ButtonProps } from "../button";

type AlertDialogTriggerProps = ButtonProps<typeof RadixAlertDialog.Trigger>;

export const AlertDialogTrigger = forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { presence } = useAlertDialogContext("AlertDialogTrigger");

  return (
    <RadixAlertDialog.Trigger
      asChild
      data-expanded={presence ? "" : undefined}
      ref={ref}
      {...props}
    >
      {asChild ? children : <Button>{children}</Button>}
    </RadixAlertDialog.Trigger>
  );
});

AlertDialogTrigger.displayName = "@optiaxiom/react/AlertDialogTrigger";
