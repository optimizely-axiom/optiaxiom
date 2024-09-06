import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { useDialogContext } from "../dialog-context";
import { IconX } from "../icons/IconX";
import { Transition } from "../transition";
import * as styles from "./DialogContent.css";

type DialogContentProps = BoxProps<
  typeof RadixDialog.Content,
  {
    withCloseButton?: boolean;
  } & styles.DialogVariants
>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, size = "md", withCloseButton = false, ...props }, ref) => {
    const { open } = useDialogContext("DialogContent");

    return (
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
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
