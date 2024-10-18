import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { PopoverPortal } from "@radix-ui/react-popover";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Transition } from "../transition";
import * as styles from "./MenuContentBase.css";

export type MenuContentBaseProps<
  T extends ElementType = "div",
  P = unknown,
> = BoxProps<T, ExtendProps<NonNullable<styles.ContentVariants>, P>>;

export const MenuContentBase = forwardRef<
  HTMLDivElement,
  MenuContentBaseProps<
    "div",
    {
      open: boolean | undefined;
    }
  >
>(
  (
    { children, className, minW, open, provider = "popover", ...props },
    ref,
  ) => {
    const Portal =
      provider === "dropdown-menu" ? DropdownMenuPortal : PopoverPortal;

    return (
      <AnimatePresence>
        {open && (
          <Portal forceMount>
            <Transition duration="sm" type="pop">
              <Box
                asChild
                ref={ref}
                {...styles.content({ minW, provider }, className)}
                {...props}
              >
                {children}
              </Box>
            </Transition>
          </Portal>
        )}
      </AnimatePresence>
    );
  },
);

MenuContentBase.displayName = "@optiaxiom/react/MenuContentBase";
