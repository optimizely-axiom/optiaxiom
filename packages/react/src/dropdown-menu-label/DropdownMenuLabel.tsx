import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type MenuLabelProps = BoxProps<typeof RadixMenu.Label>;

export const DropdownMenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        asChild
        color="fg.tertiary"
        fontSize="sm"
        p="xs"
        ref={ref}
        {...props}
      >
        <RadixMenu.Label>{children}</RadixMenu.Label>
      </Box>
    );
  },
);

DropdownMenuLabel.displayName = "@optiaxiom/react/DropdownMenuLabel";
