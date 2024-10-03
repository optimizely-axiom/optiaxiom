import * as RadixDrawer from "@radix-ui/react-dialog";
import { type ReactNode, forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { IconX } from "../icons/IconX";
import { Transition } from "../transition";
import * as styles from "./Drawer.css";

type DrawerProps = BoxProps<
  typeof RadixDrawer.Content,
  {
    children: ReactNode;
    modal?: boolean;
    onClose: () => void;
    open?: boolean;
    withCloseButton?: boolean;
  } & styles.DrawerVariants
>;

const mapPositionToTransitionSide = {
  bottom: "top",
  left: "right",
  right: "left",
} as const;

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      modal,
      onClose,
      open,
      position = "right",
      withCloseButton = false,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixDrawer.Root modal={modal} onOpenChange={onClose} open={open}>
        <AnimatePresence>
          {open && (
            <RadixDrawer.Portal forceMount>
              <Transition>
                <Box asChild {...styles.overlay()}>
                  <RadixDrawer.Overlay />
                </Box>
              </Transition>

              <Transition
                data-side={
                  mapPositionToTransitionSide[
                    position as keyof typeof mapPositionToTransitionSide
                  ]
                }
                type="fade"
              >
                <Box asChild {...styles.content({ position })}>
                  <RadixDrawer.Content ref={ref} {...props}>
                    {children}

                    {withCloseButton && (
                      <Button
                        appearance="secondary"
                        aria-label="Close"
                        asChild
                        icon={<IconX />}
                        size="sm"
                        {...styles.close()}
                      >
                        <RadixDrawer.Close />
                      </Button>
                    )}
                  </RadixDrawer.Content>
                </Box>
              </Transition>
            </RadixDrawer.Portal>
          )}
        </AnimatePresence>
      </RadixDrawer.Root>
    );
  },
);

Drawer.displayName = "@optiaxiom/react/Drawer";
