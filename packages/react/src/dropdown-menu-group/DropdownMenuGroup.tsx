import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type MenuGroupProps = BoxProps<typeof RadixMenu.Group>;

export const DropdownMenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box asChild ref={ref} {...props}>
        <RadixMenu.Group>{children}</RadixMenu.Group>
      </Box>
    );
  },
);

DropdownMenuGroup.displayName = "@optiaxiom/react/DropdownMenuGroup";
