import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { type ReactNode, forwardRef } from "react";

import { AlertDialogContextProvider } from "../alert-dialog-context";
import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Transition } from "../transition";
import * as styles from "./AlertDialog.css";

type AlertDialogProps = BoxProps<
  typeof RadixAlertDialog.Content,
  {
    appearance?: "danger" | "primary";
    children: ReactNode;
    onOpenChange: (open: boolean) => void;
    open?: boolean;
  } & styles.DialogVariants
>;

export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      appearance = "primary",
      children,
      onOpenChange,
      open,
      size = "sm",
      ...props
    },
    ref,
  ) => {
    return (
      <RadixAlertDialog.Root onOpenChange={onOpenChange} open={open}>
        <AlertDialogContextProvider appearance={appearance}>
          <AnimatePresence>
            {open && (
              <RadixAlertDialog.Portal forceMount>
                <Transition>
                  <Box asChild {...styles.overlay()}>
                    <RadixAlertDialog.Overlay />
                  </Box>
                </Transition>

                <Transition data-side="bottom" type="fade">
                  <Box asChild {...styles.content({ size })}>
                    <RadixAlertDialog.Content ref={ref} {...props}>
                      {children}
                    </RadixAlertDialog.Content>
                  </Box>
                </Transition>
              </RadixAlertDialog.Portal>
            )}
          </AnimatePresence>
        </AlertDialogContextProvider>
      </RadixAlertDialog.Root>
    );
  },
);

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
