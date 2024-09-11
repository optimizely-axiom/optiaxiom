import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { extractSprinkles } from "../sprinkles";

type AlertDialogActionProps = ButtonProps<typeof RadixAlertDialog.Action>;

export const AlertDialogAction = forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ asChild, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixAlertDialog.Action asChild ref={ref} {...sprinkleProps}>
      {asChild ? (
        children
      ) : (
        <Button appearance="danger" {...restProps}>
          {children}
        </Button>
      )}
    </RadixAlertDialog.Action>
  );
});

AlertDialogAction.displayName = "@optiaxiom/react/AlertDialogAction";
