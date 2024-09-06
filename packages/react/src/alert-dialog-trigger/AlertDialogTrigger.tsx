import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { extractSprinkles } from "../sprinkles";

type AlertDialogTriggerProps = ButtonProps<typeof RadixAlertDialog.Trigger>;

export const AlertDialogTrigger = forwardRef<
  HTMLButtonElement,
  AlertDialogTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixAlertDialog.Trigger asChild ref={ref} {...sprinkleProps}>
      {asChild ? children : <Button {...restProps}>{children}</Button>}
    </RadixAlertDialog.Trigger>
  );
});

AlertDialogTrigger.displayName = "@optiaxiom/react/AlertDialogTrigger";
