import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef } from "react";

import { MenuContextProvider } from "../menu-context";

type MenuProps = ComponentPropsWithoutRef<typeof RadixMenu.Root>;

export const Menu = ({
  children,
  defaultOpen,
  onOpenChange,
  open: openProp,
  ...props
}: MenuProps) => {
  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixMenu.Root onOpenChange={setOpen} open={open} {...props}>
      <MenuContextProvider open={open}>{children}</MenuContextProvider>
    </RadixMenu.Root>
  );
};

Menu.displayName = "@optiaxiom/react/Menu";
