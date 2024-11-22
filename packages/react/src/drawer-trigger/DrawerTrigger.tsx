import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type DrawerTriggerProps = ButtonProps<typeof RadixDialog.Trigger>;

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <RadixDialog.Trigger asChild ref={ref} {...props}>
        {asChild ? children : <Button>{children}</Button>}
      </RadixDialog.Trigger>
    );
  },
);

DrawerTrigger.displayName = "@optiaxiom/react/DrawerTrigger";
