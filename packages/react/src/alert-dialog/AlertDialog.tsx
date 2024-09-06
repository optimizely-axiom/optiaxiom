import type { ComponentPropsWithoutRef } from "react";

import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { AlertDialogContextProvider } from "../alert-dialog-context";

type AlertDialogProps = ComponentPropsWithoutRef<typeof RadixAlertDialog.Root>;

export const AlertDialog = ({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: AlertDialogProps) => {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixAlertDialog.Root onOpenChange={setOpen} open={open} {...props}>
      <AlertDialogContextProvider open={open}>
        {children}
      </AlertDialogContextProvider>
    </RadixAlertDialog.Root>
  );
};

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
