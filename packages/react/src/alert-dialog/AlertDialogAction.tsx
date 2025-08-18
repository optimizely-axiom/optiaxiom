import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

export type AlertDialogActionProps = ButtonProps<typeof RadixDialog.Close>;

export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ appearance = "danger", asChild, children, ...props }, ref) => {
  return (
    <RadixDialog.Close asChild ref={ref} {...props}>
      {asChild ? children : <Button appearance={appearance}>{children}</Button>}
    </RadixDialog.Close>
  );
});

AlertDialogAction.displayName = "@optiaxiom/react/AlertDialogAction";
