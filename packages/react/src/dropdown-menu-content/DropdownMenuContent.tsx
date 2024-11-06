import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { useDropdownMenuContext } from "../dropdown-menu-context";
import { ListboxBase, type ListboxBaseProps } from "../listbox-base";

type DropdownMenuContentProps = ListboxBaseProps<typeof RadixMenu.Content>;

export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ align = "start", children, sideOffset = 2, ...props }, ref) => {
  const { open } = useDropdownMenuContext("DropdownMenuContent");

  return (
    <ListboxBase
      enableExitAnimation
      open={open}
      provider="dropdown-menu"
      {...props}
    >
      <RadixMenu.Content align={align} ref={ref} sideOffset={sideOffset}>
        {children}
      </RadixMenu.Content>
    </ListboxBase>
  );
});

DropdownMenuContent.displayName = "@optiaxiom/react/DropdownMenuContent";
