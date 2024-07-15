import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import * as styles from "./AlertDialog.css";

type AlertDialogProps = BoxProps<
  typeof RadixAlertDialog.Root,
  {
    action?: string;
    actionAppearance?: ComponentPropsWithRef<typeof Button>["appearance"];
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
      action = "Confirm",
      actionAppearance = "primary",
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
      <Box asChild>
        <RadixAlertDialog.Root open={open} {...props}>
          <RadixAlertDialog.Portal>
            <Flex asChild {...styles.overlay()}>
              <RadixAlertDialog.Overlay>
                <Box asChild {...styles.content({ size })} ref={ref}>
                  <RadixAlertDialog.Content>
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
                        <Button
                          appearance={actionAppearance}
                          onClick={onAction}
                        >
                          {action}
                        </Button>
                      </RadixAlertDialog.Action>
                    </Flex>
                  </RadixAlertDialog.Content>
                </Box>
              </RadixAlertDialog.Overlay>
            </Flex>
          </RadixAlertDialog.Portal>
        </RadixAlertDialog.Root>
      </Box>
    );
  },
);

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
