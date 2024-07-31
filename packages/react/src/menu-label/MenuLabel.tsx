import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type MenuLabelProps = BoxProps<typeof RadixMenu.Label>;

export const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        asChild
        color="fg.default"
        fontSize="md"
        fontWeight="600"
        p="xs"
        ref={ref}
        {...props}
      >
        <RadixMenu.Label>{children}</RadixMenu.Label>
      </Box>
    );
  },
);

MenuLabel.displayName = "@optiaxiom/react/MenuLabel";
