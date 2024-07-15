import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./MenuContent.css";

type MenuContentProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixMenu.Content>,
  ComponentPropsWithRef<typeof Box>
>;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <RadixMenu.Portal>
        <Box asChild {...styles.content()}>
          <RadixMenu.Content {...props} ref={ref}>
            {children}
          </RadixMenu.Content>
        </Box>
      </RadixMenu.Portal>
    );
  },
);

MenuContent.displayName = "@optiaxiom/react/MenuContent";
