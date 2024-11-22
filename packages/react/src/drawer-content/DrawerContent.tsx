import * as RadixDrawer from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Backdrop } from "../backdrop";
import { type BoxProps } from "../box";
import { useDrawerContext } from "../drawer-context";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./DrawerContent.css";

type DrawerContentProps = BoxProps<
  typeof RadixDrawer.Content,
  styles.DrawerVariants
>;

const mapPositionToTransitionSide = {
  bottom: "top",
  left: "right",
  right: "left",
} as const;

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, position = "right", ...props }, ref) => {
    const { open } = useDrawerContext("DrawerContent");

    return (
      <AnimatePresence>
        {open && (
          <RadixDrawer.Portal forceMount>
            <Transition>
              <Backdrop asChild>
                <RadixDrawer.Overlay />
              </Backdrop>
            </Transition>

            <Transition
              data-side={
                mapPositionToTransitionSide[
                  position as keyof typeof mapPositionToTransitionSide
                ]
              }
              type="fade"
            >
              <Paper
                asChild
                elevation="drawer"
                {...styles.content({ position })}
              >
                <RadixDrawer.Content ref={ref} {...props}>
                  {children}
                </RadixDrawer.Content>
              </Paper>
            </Transition>
          </RadixDrawer.Portal>
        )}
      </AnimatePresence>
    );
  },
);

DrawerContent.displayName = "@optiaxiom/react/DrawerContent";
