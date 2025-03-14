import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { useDropdownMenuContext } from "../dropdown-menu-context";
import { ListboxItem, type ListboxItemProps } from "../listbox-item";

type DropdownMenuItemProps = ListboxItemProps<typeof RadixMenu.Item>;

export const DropdownMenuItem = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ asChild, children, onSelect, ...props }, ref) => {
  const { open } = useDropdownMenuContext("@optiaxiom/react/DropdownMenuItem");

  return (
    <ListboxItem asChild ref={ref} {...props}>
      <RadixMenu.Item
        asChild={asChild}
        onPointerLeave={(event) => {
          if (!open) {
            event.preventDefault();
          }
        }}
        onPointerMove={(event) => {
          if (!open) {
            event.preventDefault();
          }
        }}
        onSelect={onSelect}
      >
        {children}
      </RadixMenu.Item>
    </ListboxItem>
  );
});

DropdownMenuItem.displayName = "@optiaxiom/react/DropdownMenuItem";
