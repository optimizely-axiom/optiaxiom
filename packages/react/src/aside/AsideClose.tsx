import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

export type AsideCloseProps = ButtonProps<typeof RadixDialog.Close>;

export const AsideClose = forwardRef<HTMLButtonElement, AsideCloseProps>(
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

AsideClose.displayName = "@optiaxiom/react/AsideClose";
