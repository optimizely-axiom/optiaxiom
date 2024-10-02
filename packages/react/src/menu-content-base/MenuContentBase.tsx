import * as RadixMenu from "@radix-ui/react-dropdown-menu";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Transition } from "../transition";
import * as styles from "./MenuContentBase.css";

export type MenuContentBaseProps<
  T extends ElementType = "div",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      open: boolean | undefined;
    } & styles.ContentVariants,
    P
  >
>;

export const MenuContentBase = forwardRef<HTMLDivElement, MenuContentBaseProps>(
  ({ children, className, minW, open, ...props }, ref) => {
    return (
      <AnimatePresence>
        {open && (
          <RadixMenu.Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box
                asChild
                ref={ref}
                {...styles.content({ minW }, className)}
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
