import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Paper } from "../paper";
import * as styles from "./MenuContent.css";

type MenuContentProps = BoxProps<typeof RadixMenu.Content>;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ align = "start", children, sideOffset = 2, ...props }, ref) => {
    return (
      <RadixMenu.Portal>
        <Paper asChild {...styles.content()} {...props}>
          <RadixMenu.Content align={align} ref={ref} sideOffset={sideOffset}>
            {children}
          </RadixMenu.Content>
        </Paper>
      </RadixMenu.Portal>
    );
  },
);

MenuContent.displayName = "@optiaxiom/react/MenuContent";
