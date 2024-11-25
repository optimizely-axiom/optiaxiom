import * as RadixDialog from "@radix-ui/react-dialog";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { DrawerContextProvider } from "../drawer-context";

type DrawerProps = ComponentPropsWithoutRef<typeof RadixDialog.Root>;

export function Drawer({
  children,
  defaultOpen,
  modal,
  onOpenChange,
  open: openProp,
}: DrawerProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixDialog.Root modal={modal} onOpenChange={setOpen} open={open}>
      <DrawerContextProvider open={open}>{children}</DrawerContextProvider>
    </RadixDialog.Root>
  );
}

Drawer.displayName = "@optiaxiom/react/Drawer";
