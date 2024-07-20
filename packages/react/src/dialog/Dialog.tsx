import * as RadixDialog from "@radix-ui/react-dialog";
import { type ReactNode, forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { IconX } from "../icons/IconX";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./Dialog.css";

type DialogProps = BoxProps<
  typeof RadixDialog.Root,
  {
    children: ReactNode;
    defaultOpen?: never;
    modal?: boolean;
    onClose: () => void;
    onOpenChange?: never;
    open?: boolean;
    withCloseButton?: boolean;
  } & styles.DialogVariants
>;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      modal,
      onClose,
      open,
      size = "md",
      withCloseButton = false,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixDialog.Root modal={modal} onOpenChange={onClose} open={open}>
        <AnimatePresence>
          {open && (
            <RadixDialog.Portal forceMount>
              <Transition>
                <Box asChild {...styles.overlay()}>
                  <RadixDialog.Overlay />
                </Box>
              </Transition>

              <Transition type="fade-down">
                <Paper asChild {...styles.content({ size })}>
                  <RadixDialog.Content ref={ref} {...props}>
                    {children}

                    {withCloseButton && (
                      <Box asChild {...styles.close()}>
                        <RadixDialog.Close aria-label="Close" asChild>
                          <Button
                            appearance="secondary"
                            icon={<IconX />}
                            size="sm"
                          />
                        </RadixDialog.Close>
                      </Box>
                    )}
                  </RadixDialog.Content>
                </Paper>
              </Transition>
            </RadixDialog.Portal>
          )}
        </AnimatePresence>
      </RadixDialog.Root>
    );
  },
);

Dialog.displayName = "@optiaxiom/react/Dialog";
