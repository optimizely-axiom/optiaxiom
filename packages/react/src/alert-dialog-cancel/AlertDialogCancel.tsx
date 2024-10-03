import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { extractSprinkles } from "../sprinkles";

type AlertDialogCancelProps = ButtonProps<typeof RadixAlertDialog.Cancel>;

export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ asChild, children = "Cancel", ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixAlertDialog.Cancel asChild ref={ref} {...sprinkleProps}>
      {asChild ? (
        children
      ) : (
        <Button appearance="subtle" {...restProps}>
          {children}
        </Button>
      )}
    </RadixAlertDialog.Cancel>
  );
});

AlertDialogCancel.displayName = "@optiaxiom/react/AlertDialogCancel";
