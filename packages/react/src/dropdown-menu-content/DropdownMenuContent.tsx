import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { useDropdownMenuContext } from "../dropdown-menu-context";
import {
  MenuContentBase,
  type MenuContentBaseProps,
} from "../menu-content-base";

type DropdownMenuContentProps = MenuContentBaseProps<typeof RadixMenu.Content>;

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ align = "start", children, sideOffset = 2, ...props }, ref) => {
  const { open } = useDropdownMenuContext("DropdownMenuContent");

  return (
    <MenuContentBase
      enableExitAnimation
      open={open}
      provider="dropdown-menu"
      {...props}
    >
      <RadixMenu.Content align={align} ref={ref} sideOffset={sideOffset}>
        {children}
      </RadixMenu.Content>
    </MenuContentBase>
  );
});

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
