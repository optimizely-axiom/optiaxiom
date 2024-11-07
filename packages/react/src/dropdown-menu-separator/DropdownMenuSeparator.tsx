import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Separator } from "../separator";

type MenuSeparatorProps = BoxProps<typeof RadixMenu.Separator>;

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  MenuSeparatorProps
>((props, ref) => (
  <Separator asChild bg="border.secondary" flex="none" mx="8" my="4" {...props}>
    <RadixMenu.Separator ref={ref} />
  </Separator>
));

DropdownMenuSeparator.displayName = "@optiaxiom/react/DropdownMenuSeparator";
