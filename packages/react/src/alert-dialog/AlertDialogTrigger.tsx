import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

export type AlertDialogTriggerProps = ButtonProps<typeof RadixDialog.Trigger>;

export const AlertDialogTrigger = forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ asChild, children, ...props }, ref) => {
  return (
    <RadixDialog.Trigger asChild ref={ref} {...props}>
      {asChild ? children : <Button>{children}</Button>}
    </RadixDialog.Trigger>
  );
});

AlertDialogTrigger.displayName = "@optiaxiom/react/AlertDialogTrigger";
