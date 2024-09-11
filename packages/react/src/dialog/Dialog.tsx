import type { ComponentPropsWithoutRef } from "react";

import * as RadixDialog from "@radix-ui/react-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { DialogContextProvider } from "../dialog-context";

type DialogProps = ComponentPropsWithoutRef<typeof RadixDialog.Root>;

export function Dialog({
  children,
  defaultOpen,
  modal,
  onOpenChange,
  open: openProp,
  ...props
}: DialogProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixDialog.Root
      modal={modal}
      onOpenChange={setOpen}
      open={open}
      {...props}
    >
      <DialogContextProvider open={open}>{children}</DialogContextProvider>
    </RadixDialog.Root>
  );
}

Dialog.displayName = "@optiaxiom/react/Dialog";
