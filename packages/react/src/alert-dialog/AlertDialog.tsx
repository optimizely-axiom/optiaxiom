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
            <Flex
              alignItems="center"
              asChild
              bg="dark.200"
              h="full"
              w="full"
              {...styles.overlay()}
            >
              <RadixAlertDialog.Overlay>
                <Box
                  asChild
                  bg="white"
                  p="24"
                  ref={ref}
                  rounded="sm"
                  shadow="md"
                  w="full"
                  {...styles.content()}
                >
                  <RadixAlertDialog.Content>
                    <Box>
                      <Box asChild fontSize="2xl" fontWeight="600" mb="0">
                        <RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>
                      </Box>

                      <Box
                        asChild
                        fontSize="md"
                        maxH="xs"
                        mr="-24"
                        my="24"
                        overflow="auto"
                        pr="24"
                      >
                        <RadixAlertDialog.Description>
                          {children}
                        </RadixAlertDialog.Description>
                      </Box>
                      <Flex flexDirection="row" gap="xs" justifyContent="end">
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
