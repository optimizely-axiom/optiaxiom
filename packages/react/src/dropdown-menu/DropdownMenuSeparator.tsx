import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { ListboxSeparator } from "../listbox";

export type DropdownMenuSeparatorProps = BoxProps<typeof RadixMenu.Separator>;

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>((props, ref) => (
  <ListboxSeparator asChild {...props}>
    <RadixMenu.Separator ref={ref} />
  </ListboxSeparator>
));

DropdownMenuSeparator.displayName = "@optiaxiom/react/DropdownMenuSeparator";
