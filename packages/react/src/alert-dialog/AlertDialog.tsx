import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { type ReactNode, forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./AlertDialog.css";

type AlertDialogProps = BoxProps<
  typeof RadixAlertDialog.Root,
  {
    action: string;
    appearance?: "danger" | "primary";
    cancel?: string;
    children: ReactNode;
    onAction: () => void;
    onCancel: () => void;
    title: ReactNode;
  } & styles.DialogVariants
>;

export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      action,
      appearance = "primary",
      cancel = "Cancel",
      children,
      defaultOpen,
      onAction,
      onCancel,
      onOpenChange,
      open,
      size = "sm",
      title,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixAlertDialog.Root
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        open={open}
      >
        <AnimatePresence>
          {open && (
            <RadixAlertDialog.Portal forceMount>
              <Transition>
                <Box asChild {...styles.overlay()}>
                  <RadixAlertDialog.Overlay />
                </Box>
              </Transition>

              <Transition type="fade-down">
                <Paper asChild {...styles.content({ size })}>
                  <RadixAlertDialog.Content ref={ref} {...props}>
                    <Box asChild {...styles.title()}>
                      <RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>
                    </Box>

                    <Box asChild {...styles.description()}>
                      <RadixAlertDialog.Description>
                        {children}
                      </RadixAlertDialog.Description>
                    </Box>

                    <Flex {...styles.footer()}>
                      <RadixAlertDialog.Cancel asChild>
                        <Button appearance="secondary" onClick={onCancel}>
                          {cancel}
                        </Button>
                      </RadixAlertDialog.Cancel>
                      <RadixAlertDialog.Action asChild>
                        <Button appearance={appearance} onClick={onAction}>
                          {action}
                        </Button>
                      </RadixAlertDialog.Action>
                    </Flex>
                  </RadixAlertDialog.Content>
                </Paper>
              </Transition>
            </RadixAlertDialog.Portal>
          )}
        </AnimatePresence>
      </RadixAlertDialog.Root>
    );
  },
);

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
