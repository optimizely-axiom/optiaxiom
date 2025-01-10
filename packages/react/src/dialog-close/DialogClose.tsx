import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type DialogCloseProps = ButtonProps<typeof RadixDialog.Close>;

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  (
    { appearance = "subtle", asChild, children, size = "lg", ...props },
    ref,
  ) => {
    return (
      <RadixDialog.Close asChild ref={ref} {...props}>
        {asChild ? (
          children
        ) : (
          <Button appearance={appearance} size={size}>
            {children}
          </Button>
        )}
      </RadixDialog.Close>
    );
  },
);

DialogClose.displayName = "@optiaxiom/react/DialogClose";
