import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { IconAngleRight } from "../icons/IconAngleRight";
import { ListboxItem, type ListboxItemProps } from "../listbox-item";

type MenuSubTriggerProps = ListboxItemProps<typeof RadixMenu.SubTrigger>;

export const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  MenuSubTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <ListboxItem addonAfter={<IconAngleRight />} asChild ref={ref} {...props}>
      <RadixMenu.SubTrigger>{children}</RadixMenu.SubTrigger>
    </ListboxItem>
  );
});

DropdownMenuSubTrigger.displayName = "@optiaxiom/react/DropdownMenuSubTrigger";
