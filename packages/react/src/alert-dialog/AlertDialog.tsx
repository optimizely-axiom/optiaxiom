import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { type ReactNode, forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Transition } from "../transition";
import * as styles from "./AlertDialog.css";

type AlertDialogProps = BoxProps<
  typeof RadixAlertDialog.Content,
  {
    action: string;
    appearance?: "danger" | "primary";
    cancel?: string;
    children: ReactNode;
    onAction: () => void;
    onCancel: () => void;
    open?: boolean;
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
      onAction,
      onCancel,
      open,
      size = "sm",
      title,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixAlertDialog.Root open={open}>
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
                    <Heading
                      asChild
                      fontWeight="500"
                      level="3"
                      pb="16"
                      pt="24"
                      px="24"
                    >
                      <RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>
                    </Heading>

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
                </Box>
              </Transition>
            </RadixAlertDialog.Portal>
          )}
        </AnimatePresence>
      </RadixAlertDialog.Root>
    );
  },
);

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
