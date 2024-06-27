import * as RadixDialog from "@radix-ui/react-alert-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import * as styles from "./AlertDialog.css";
type AlertDialogProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixDialog.Root>,
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
        <RadixDialog.Root open={open} {...props}>
          <RadixDialog.Portal>
            <RadixDialog.Overlay asChild>
              <Flex className={styles.dialogOverlay} h="full" w="full">
                <RadixDialog.Content asChild>
                  <Box
                    className={styles.dialogContent}
                    maxH="lg"
                    maxW="md"
                    p="md"
                    ref={ref}
                    rounded="sm"
                    w="full"
                  >
                    <RadixDialog.Title asChild>
                      <Box fontSize="xl" fontWeight="500" m="0">
                        {title}
                      </Box>
                    </RadixDialog.Title>
                    <RadixDialog.Description asChild>
                      <Box fontSize="md" maxH="xs" my="24" overflow="auto">
                        {children}
                      </Box>
                    </RadixDialog.Description>
                    <Flex flexDirection="row" gap="16" justifyContent="end">
                      <RadixDialog.Cancel asChild>
                        <Button onClick={onCancel}>{cancel}</Button>
                      </RadixDialog.Cancel>
                      <RadixDialog.Action asChild>
                        <Button onClick={onAction} preset="primary">
                          {action}
                        </Button>
                      </RadixDialog.Action>
                    </Flex>
                  </Box>
                </RadixDialog.Content>
              </Flex>
            </RadixDialog.Overlay>
          </RadixDialog.Portal>
        </RadixDialog.Root>
      </Box>
    );
  },
);

AlertDialog.displayName = "@optiaxiom/react/AlertDialog";
