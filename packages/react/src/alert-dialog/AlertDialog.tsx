import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import * as styles from "./AlertDialog.css";
type AlertDialogProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixAlertDialog.Root>,
  ComponentPropsWithRef<typeof Box>,
  {
    action?: string;
    cancel?: string;
    children: ReactNode;
    onAction: () => void;
    onCancel: () => void;
    title: ReactNode;
  }
>;

export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      action = "Confirm",
      cancel = "Cancel",
      children,
      onAction,
      onCancel,
      open,
      title,
      ...props
    },
    ref,
  ) => {
    return (
      <Box asChild>
        <RadixAlertDialog.Root open={open} {...props}>
          <RadixAlertDialog.Portal>
            <RadixAlertDialog.Overlay asChild>
              <Flex
                alignItems="center"
                className={styles.overlay}
                h="full"
                w="full"
              >
                <RadixAlertDialog.Content asChild>
                  <Box
                    className={styles.content}
                    p="24"
                    ref={ref}
                    rounded="sm"
                    w="full"
                  >
                    <RadixAlertDialog.Title asChild>
                      <Box fontSize="2xl" fontWeight="600" mb="0">
                        {title}
                      </Box>
                    </RadixAlertDialog.Title>
                    <RadixAlertDialog.Description asChild>
                      <Box fontSize="md" maxH="xs" my="24" overflow="auto">
                        {children}
                      </Box>
                    </RadixAlertDialog.Description>
                    <Flex flexDirection="row" gap="8" justifyContent="end">
                      <RadixAlertDialog.Cancel asChild>
                        <Button onClick={onCancel}>{cancel}</Button>
                      </RadixAlertDialog.Cancel>
                      <RadixAlertDialog.Action asChild>
                        <Button onClick={onAction} preset="primary">
                          {action}
                        </Button>
                      </RadixAlertDialog.Action>
                    </Flex>
                  </Box>
                </RadixAlertDialog.Content>
              </Flex>
            </RadixAlertDialog.Overlay>
          </RadixAlertDialog.Portal>
        </RadixAlertDialog.Root>
      </Box>
    );
  },
);

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
