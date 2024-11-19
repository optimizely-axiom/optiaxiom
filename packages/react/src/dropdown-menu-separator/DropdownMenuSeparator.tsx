import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { ListboxSeparator } from "../listbox-separator";

type MenuSeparatorProps = BoxProps<typeof RadixMenu.Separator>;

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  MenuSeparatorProps
>((props, ref) => (
  <ListboxSeparator asChild {...props}>
    <RadixMenu.Separator ref={ref} />
  </ListboxSeparator>
));

DropdownMenuSeparator.displayName = "@optiaxiom/react/DropdownMenuSeparator";
