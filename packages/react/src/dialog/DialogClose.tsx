import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef, useContext } from "react";

import { Button, type ButtonProps } from "../button";
import { DialogKitContext } from "../dialog-kit/internals";

export type DialogCloseProps = ButtonProps<typeof RadixDialog.Close>;

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ appearance = "subtle", asChild, children, onClick, ...props }, ref) => {
    const { onDismiss } = useContext(DialogKitContext) ?? {};

    return (
      <RadixDialog.Close
        asChild
        onClick={(event) => {
          if (onDismiss) {
            onDismiss(event, "cancel");
            if (event.defaultPrevented) {
              return;
            }
          }
          onClick?.(event);
        }}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <Button appearance={appearance}>{children}</Button>
        )}
      </RadixDialog.Close>
    );
  },
);

DialogClose.displayName = "@optiaxiom/react/DialogClose";
