import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { DropdownSubContextProvider } from "../dropdown-sub-context";

type SubProps = ComponentPropsWithoutRef<typeof RadixMenu.Sub>;

export function DropdownSub({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: SubProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixMenu.Sub onOpenChange={setOpen} open={open} {...props}>
      <DropdownSubContextProvider open={open}>
        {children}
      </DropdownSubContextProvider>
    </RadixMenu.Sub>
  );
}

DropdownSub.displayName = "@optiaxiom/react/DropdownSub";
