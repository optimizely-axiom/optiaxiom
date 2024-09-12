import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import { MenuContentBase } from "../menu-content-base";

type MenuSubContentProps = BoxProps<typeof RadixMenu.SubContent>;

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  MenuSubContentProps
>(({ children, sideOffset = 2, ...props }, ref) => {
  const { open } = useDropdownMenuSubContext("DropdownMenuSubContent");

  return (
    <MenuContentBase open={open} {...props}>
      <RadixMenu.SubContent ref={ref} sideOffset={sideOffset}>
        {children}
      </RadixMenu.SubContent>
    </MenuContentBase>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
