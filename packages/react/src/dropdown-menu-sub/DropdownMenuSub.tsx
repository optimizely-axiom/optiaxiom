import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { DropdownMenuSubContextProvider } from "../dropdown-menu-sub-context";

type MenuSubProps = ComponentPropsWithoutRef<typeof RadixMenu.Sub>;

export function DropdownMenuSub({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: MenuSubProps) {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixMenu.Sub onOpenChange={setOpen} open={open} {...props}>
      <DropdownMenuSubContextProvider open={open}>
        {children}
      </DropdownMenuSubContextProvider>
    </RadixMenu.Sub>
  );
}

DropdownMenuSub.displayName = "@optiaxiom/react/DropdownMenuSub";
