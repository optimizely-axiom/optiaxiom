import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type DialogTriggerProps = ButtonProps<typeof RadixDialog.Trigger>;

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <RadixDialog.Trigger asChild ref={ref} {...props}>
        {asChild ? children : <Button>{children}</Button>}
      </RadixDialog.Trigger>
    );
  },
);

DialogTrigger.displayName = "@optiaxiom/react/DialogTrigger";
