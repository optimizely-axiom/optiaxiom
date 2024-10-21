import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import {
  MenuContentBase,
  type MenuContentBaseProps,
} from "../menu-content-base";

type MenuSubContentProps = MenuContentBaseProps<typeof RadixMenu.SubContent>;

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  MenuSubContentProps
>(({ alignOffset = -4, children, sideOffset = 2, ...props }, ref) => {
  const { open } = useDropdownMenuSubContext("DropdownMenuSubContent");

  return (
    <MenuContentBase
      enableExitAnimation
      open={open}
      provider="dropdown-menu"
      {...props}
    >
      <RadixMenu.SubContent
        alignOffset={alignOffset}
        ref={ref}
        sideOffset={sideOffset}
      >
        {children}
      </RadixMenu.SubContent>
    </MenuContentBase>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
