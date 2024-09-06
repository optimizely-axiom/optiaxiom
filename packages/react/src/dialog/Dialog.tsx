import * as RadixDialog from "@radix-ui/react-dialog";
import { type ReactNode, forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { IconX } from "../icons/IconX";
import { Transition } from "../transition";
import * as styles from "./Dialog.css";

type DialogProps = BoxProps<
  typeof RadixDialog.Content,
  {
    children: ReactNode;
    modal?: boolean;
    onOpenChange: (open: boolean) => void;
    open?: boolean;
    withCloseButton?: boolean;
  } & styles.DialogVariants
>;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      children,
      modal,
      onOpenChange,
      open,
      size = "md",
      withCloseButton = false,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixDialog.Root modal={modal} onOpenChange={onOpenChange} open={open}>
        <AnimatePresence>
          {open && (
            <RadixDialog.Portal forceMount>
              <Transition>
                <Box asChild {...styles.overlay()}>
                  <RadixDialog.Overlay />
                </Box>
              </Transition>

              <Transition data-side="bottom" type="fade">
                <Box asChild {...styles.content({ size })}>
                  <RadixDialog.Content ref={ref} {...props}>
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
                        <RadixDialog.Close />
                      </Button>
                    )}
                  </RadixDialog.Content>
                </Box>
              </Transition>
            </RadixDialog.Portal>
          )}
        </AnimatePresence>
      </RadixDialog.Root>
    );
  },
);

Dialog.displayName = "@optiaxiom/react/Dialog";
