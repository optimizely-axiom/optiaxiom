import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Backdrop } from "../backdrop";
import { type BoxProps } from "../box";
import { useDrawerContext } from "../drawer-context";
import { Paper } from "../paper";
import { Transition } from "../transition";
import { TransitionGroup } from "../transition-group";
import { onReactSelectInputBlur } from "../utils";
import * as styles from "./DrawerContent.css";

type DrawerContentProps = BoxProps<
  typeof RadixDialog.Content,
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
      <TransitionGroup open={open}>
        <RadixDialog.Portal forceMount>
          <Transition>
            <Backdrop asChild>
              <RadixDialog.Overlay />
            </Backdrop>
          </Transition>

          <Transition
            data-side={mapPositionToTransitionSide[position]}
            type="fade"
          >
            <Paper
              asChild
              elevation="drawer"
              onBlur={onReactSelectInputBlur}
              {...styles.content({ position })}
            >
              <RadixDialog.Content ref={ref} {...props}>
                {children}
              </RadixDialog.Content>
            </Paper>
          </Transition>
        </RadixDialog.Portal>
      </TransitionGroup>
    );
  },
);

DrawerContent.displayName = "@optiaxiom/react/DrawerContent";
