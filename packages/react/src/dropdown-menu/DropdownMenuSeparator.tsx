import { DropdownMenu as RadixMenu } from "radix-ui";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { ListboxSeparator } from "../listbox";

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
