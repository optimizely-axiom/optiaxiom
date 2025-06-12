import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

export type AsideTriggerProps = ButtonProps<typeof RadixDialog.Trigger>;

export const AsideTrigger = forwardRef<HTMLButtonElement, AsideTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <RadixDialog.Trigger asChild ref={ref} {...props}>
        {asChild ? children : <Button>{children}</Button>}
      </RadixDialog.Trigger>
    );
  },
);

AsideTrigger.displayName = "@optiaxiom/react/AsideTrigger";
