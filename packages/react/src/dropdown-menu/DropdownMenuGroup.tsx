import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

export type DropdownMenuGroupProps = BoxProps<typeof RadixMenu.Group>;

export const DropdownMenuGroup = forwardRef<
  HTMLDivElement,
  DropdownMenuGroupProps
>(({ children, ...props }, ref) => {
  return (
    <Box asChild ref={ref} {...props}>
      <RadixMenu.Group>{children}</RadixMenu.Group>
    </Box>
  );
});

DropdownMenuGroup.displayName = "@optiaxiom/react/DropdownMenuGroup";
