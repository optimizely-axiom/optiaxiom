import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { extractSprinkles } from "../sprinkles";

type DialogCloseProps = ButtonProps<typeof RadixDialog.Close>;

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild, children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <RadixDialog.Close asChild ref={ref} {...sprinkleProps}>
        {asChild ? children : <Button {...restProps}>{children}</Button>}
      </RadixDialog.Close>
    );
  },
);

DialogClose.displayName = "@optiaxiom/react/DialogClose";
