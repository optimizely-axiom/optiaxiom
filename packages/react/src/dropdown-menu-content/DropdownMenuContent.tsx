import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { AnimatePresence } from "../animate-presence";
import { useDropdownMenuContext } from "../dropdown-menu-context";
import { MenuListbox } from "../menu-listbox";

type DropdownMenuContentProps = BoxProps<
  typeof RadixMenu.Content,
  {
    minW?: ComponentPropsWithoutRef<typeof MenuListbox>["minW"];
  }
>;

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ align = "start", children, sideOffset = 4, ...props }, ref) => {
  const { open } = useDropdownMenuContext("DropdownMenuContent");

  return (
    <AnimatePresence>
      {open && (
        <RadixMenu.Portal forceMount>
          <MenuListbox asChild {...props}>
            <RadixMenu.Content align={align} ref={ref} sideOffset={sideOffset}>
              {children}
            </RadixMenu.Content>
          </MenuListbox>
        </RadixMenu.Portal>
      )}
    </AnimatePresence>
  );
});

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
