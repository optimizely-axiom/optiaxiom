import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type DrawerCloseProps = ButtonProps<typeof RadixDialog.Close>;

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <RadixDialog.Close asChild ref={ref} {...props}>
        {asChild ? children : <Button>{children}</Button>}
      </RadixDialog.Close>
    );
  },
);

DrawerClose.displayName = "@optiaxiom/react/DrawerClose";
