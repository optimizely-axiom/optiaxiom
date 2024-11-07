import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { useDropdownMenuSubContext } from "../dropdown-menu-sub-context";
import { ListboxBase, type ListboxBaseProps } from "../listbox-base";

type MenuSubContentProps = ListboxBaseProps<typeof RadixMenu.SubContent>;

export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  MenuSubContentProps
>(({ alignOffset = -4, children, sideOffset = 0, ...props }, ref) => {
  const { open } = useDropdownMenuSubContext("DropdownMenuSubContent");

  return (
    <ListboxBase
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
    </ListboxBase>
  );
});

DropdownMenuSubContent.displayName = "@optiaxiom/react/DropdownMenuSubContent";
