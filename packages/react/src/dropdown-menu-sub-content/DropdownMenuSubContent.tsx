import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { AnimatePresence } from "../animate-presence";
import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import { MenuListbox } from "../menu-listbox";

type MenuSubContentProps = BoxProps<
  typeof RadixMenu.SubContent,
  Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "minW">
>;

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  MenuSubContentProps
>(({ children, ...props }, ref) => {
  const { open } = useDropdownMenuSubContext("DropdownMenuSubContent");

  return (
    <AnimatePresence>
      {open && (
        <RadixMenu.Portal forceMount>
          <MenuListbox asChild provider="dropdown-menu" {...props}>
            <RadixMenu.SubContent alignOffset={-4} ref={ref} sideOffset={0}>
              {children}
            </RadixMenu.SubContent>
          </MenuListbox>
        </RadixMenu.Portal>
      )}
    </AnimatePresence>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
