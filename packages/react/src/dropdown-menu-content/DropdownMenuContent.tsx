import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { useDropdownMenuContext } from "../dropdown-menu-context";
import { MenuContentBase } from "../menu-content-base";

type MenuContentProps = BoxProps<typeof RadixMenu.Content>;

export const DropdownMenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ align = "start", children, sideOffset = 2, ...props }, ref) => {
    const { open } = useDropdownMenuContext("DropdownMenuContent");

    return (
      <MenuContentBase open={open} {...props}>
        <RadixMenu.Content align={align} ref={ref} sideOffset={sideOffset}>
          {children}
        </RadixMenu.Content>
      </MenuContentBase>
    );
  },
);

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
