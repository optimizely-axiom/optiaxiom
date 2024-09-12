import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Transition } from "../transition";
import * as styles from "./MenuContentBase.css";

type MenuContentProps = BoxProps<
  "div",
  {
    open: boolean | undefined;
  }
>;

export const MenuContentBase = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, open, ...props }, ref) => {
    return (
      <AnimatePresence>
        {open && (
          <RadixMenu.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box
                asChild
                ref={ref}
                {...styles.content({}, className)}
                {...props}
              >
                {children}
              </Box>
            </Transition>
          </RadixMenu.Portal>
        )}
      </AnimatePresence>
    );
  },
);

MenuContentBase.displayName = "@optiaxiom/react/MenuContentBase";
