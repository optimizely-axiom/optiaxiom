import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { useDialogContext } from "./DialogContext";

export type DialogTriggerProps = ButtonProps<typeof RadixDialog.Trigger>;

/**
 * @extends Button
 * @group Dialog
 */
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, outerRef) => {
    const { triggerRef } = useDialogContext("@optiaxiom/react/DialogTrigger");
    const ref = useComposedRefs(outerRef, triggerRef);

    return (
      <RadixDialog.Trigger asChild ref={ref} {...props}>
        {asChild ? children : <Button>{children}</Button>}
      </RadixDialog.Trigger>
    );
  },
);

DialogTrigger.displayName = "@optiaxiom/react/DialogTrigger";
