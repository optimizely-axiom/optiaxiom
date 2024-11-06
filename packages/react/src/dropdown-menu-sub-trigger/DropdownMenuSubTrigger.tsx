import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { IconAngleRight } from "../icons/IconAngleRight";
import {
  ListboxItemBase,
  type ListboxItemBaseProps,
} from "../listbox-item-base";

type MenuSubTriggerProps = ListboxItemBaseProps<typeof RadixMenu.SubTrigger>;

export const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  MenuSubTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <ListboxItemBase addonAfter={<IconAngleRight />} ref={ref} {...props}>
      <RadixMenu.SubTrigger>{children}</RadixMenu.SubTrigger>
    </ListboxItemBase>
  );
});

DropdownMenuSubTrigger.displayName = "@optiaxiom/react/DropdownMenuSubTrigger";
