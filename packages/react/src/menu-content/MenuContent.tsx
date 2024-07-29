import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./MenuContent.css";

type MenuContentProps = BoxProps<typeof RadixMenu.Content>;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <RadixMenu.Portal>
        <Box asChild {...styles.content()} {...props}>
          <RadixMenu.Content ref={ref}>{children}</RadixMenu.Content>
        </Box>
      </RadixMenu.Portal>
    );
  },
);

MenuContent.displayName = "@optiaxiom/react/MenuContent";
