import { IconChevronRight } from "@optiaxiom/icons";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { ListboxItem, type ListboxItemProps } from "../listbox";

export type DropdownMenuSubTriggerProps = ListboxItemProps<
  typeof RadixMenu.SubTrigger
>;

/**
 * @group DropdownMenu
 */
export const DropdownMenuSubTrigger = forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <ListboxItem addonAfter={<IconChevronRight />} asChild ref={ref} {...props}>
      <RadixMenu.SubTrigger>{children}</RadixMenu.SubTrigger>
    </ListboxItem>
  );
});

DropdownMenuSubTrigger.displayName = "@optiaxiom/react/DropdownMenuSubTrigger";
