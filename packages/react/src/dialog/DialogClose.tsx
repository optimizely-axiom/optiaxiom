import { Dialog as RadixDialog } from "radix-ui";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type DialogCloseProps = ButtonProps<typeof RadixDialog.Close>;

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ appearance = "subtle", asChild, children, ...props }, ref) => {
    return (
      <RadixDialog.Close asChild ref={ref} {...props}>
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
