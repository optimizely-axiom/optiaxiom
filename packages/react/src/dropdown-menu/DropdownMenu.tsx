import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { DropdownMenuContextProvider } from "../dropdown-menu-context";

type MenuProps = ComponentPropsWithoutRef<typeof RadixMenu.Root>;

export function DropdownMenu({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: MenuProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixMenu.Root onOpenChange={setOpen} open={open} {...props}>
      <DropdownMenuContextProvider open={open}>
        {children}
      </DropdownMenuContextProvider>
    </RadixMenu.Root>
  );
}

DropdownMenu.displayName = "@optiaxiom/react/DropdownMenu";
