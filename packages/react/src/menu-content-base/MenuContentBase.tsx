import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { PopoverPortal } from "@radix-ui/react-popover";
import { Portal } from "@radix-ui/react-portal";
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
      enableExitAnimation?: boolean;
    } & styles.ContentVariants,
    P
  >
>;

const mapProviderToPortal = {
  "dropdown-menu": DropdownMenuPortal,
  popover: PopoverPortal,
  popper: Portal,
};

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
    {
      children,
      className,
      enableExitAnimation,
      minW,
      open,
      provider = "popover",
      ...props
    },
    ref,
  ) => {
    const Portal = mapProviderToPortal[provider];

    const element = (
      <Portal {...(provider !== "popper" && { forceMount: true })}>
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
    );
    return enableExitAnimation ? (
      <AnimatePresence>{open && element}</AnimatePresence>
    ) : (
      open && element
    );
  },
);

MenuContentBase.displayName = "@optiaxiom/react/MenuContentBase";
