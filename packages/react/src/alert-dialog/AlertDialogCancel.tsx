import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { useAlertDialogContext } from "./AlertDialogContext";

export type AlertDialogCancelProps = ButtonProps<typeof RadixDialog.Close>;

export const AlertDialogCancel = forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(
  (
    { appearance = "subtle", asChild, children = "Cancel", ...props },
    outerRef,
  ) => {
    const { cancelRef } = useAlertDialogContext(
      "@optiaxiom/react/AlertDialogCancel",
    );
    const ref = useComposedRefs(cancelRef, outerRef);

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

AlertDialogCancel.displayName = "@optiaxiom/react/AlertDialogCancel";
