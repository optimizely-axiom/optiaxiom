import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { PopoverPortal } from "@radix-ui/react-popover";
import { Portal } from "@radix-ui/react-portal";
import { type ElementType, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { AnimatePresence } from "../animate-presence";
import { type BoxProps } from "../box";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./ListboxBase.css";

export type ListboxBaseProps<
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

export const ListboxBase = forwardRef<
  HTMLDivElement,
  ListboxBaseProps<
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
      <Portal
        {...(provider === "popper" ? { asChild: true } : { forceMount: true })}
      >
        <Transition duration="sm" type="pop">
          <Paper
            asChild
            ref={ref}
            {...styles.content({ minW, provider }, className)}
            {...props}
          >
            {children}
          </Paper>
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

ListboxBase.displayName = "@optiaxiom/react/ListboxBase";
