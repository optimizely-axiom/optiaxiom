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
  } & styles.DialogVariants
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
      size = "md",
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
                  ref={ref}
                  rounded="lg"
                  shadow="md"
                  {...styles.content({ size })}
                >
                  <RadixAlertDialog.Content>
                    <Box>
                      <Box
                        asChild
                        fontSize="2xl"
                        fontWeight="600"
                        pb="16"
                        pt="24"
                        px="24"
                      >
                        <RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>
                      </Box>

                      <Box
                        asChild
                        fontSize="md"
                        maxH="xs"
                        overflow="auto"
                        px="24"
                        py="16"
                      >
                        <RadixAlertDialog.Description>
                          {children}
                        </RadixAlertDialog.Description>
                      </Box>
                      <Flex
                        flexDirection="row"
                        gap="md"
                        justifyContent="end"
                        px="24"
                        py="20"
                        {...styles.footer()}
                      >
                        <RadixAlertDialog.Cancel asChild>
                          <Button appearance="secondary" onClick={onCancel}>
                            {cancel}
                          </Button>
                        </RadixAlertDialog.Cancel>
                        <RadixAlertDialog.Action asChild>
                          <Button appearance="primary" onClick={onAction}>
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
