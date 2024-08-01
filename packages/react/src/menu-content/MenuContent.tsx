import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef, useContext } from "react";

import { AnimatePresence } from "../animate-presence";
import { type BoxProps } from "../box";
import { MenuContext } from "../menu-context";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./MenuContent.css";

type MenuContentProps = BoxProps<typeof RadixMenu.Content>;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ align = "start", children, className, sideOffset = 2, ...props }, ref) => {
    const { open } = useContext(MenuContext);

    return (
      <AnimatePresence>
        {open && (
          <RadixMenu.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Paper asChild {...styles.content({}, className)} {...props}>
                <RadixMenu.Content
                  align={align}
                  ref={ref}
                  sideOffset={sideOffset}
                >
                  {children}
                </RadixMenu.Content>
              </Paper>
            </Transition>
          </RadixMenu.Portal>
        )}
      </AnimatePresence>
    );
  },
);

MenuContent.displayName = "@optiaxiom/react/MenuContent";
