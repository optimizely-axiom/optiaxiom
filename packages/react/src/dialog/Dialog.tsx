import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Paper } from "../paper";
import { CloseIcon } from "./CloseIcon";
import * as styles from "./Dialog.css";

type DialogProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  Pick<ComponentPropsWithRef<typeof RadixDialog.Root>, "modal" | "open">,
  {
    children: ReactNode;
    onClose: () => void;
    withCloseButton?: boolean;
  } & styles.DialogVariants
>;
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    { children, onClose, size = "md", withCloseButton = false, ...props },
    ref,
  ) => {
    return (
      <RadixDialog.Root onOpenChange={onClose} {...props}>
        <RadixDialog.Portal>
          <Flex asChild {...styles.overlay()} ref={ref}>
            <RadixDialog.Overlay>
              <Paper asChild {...styles.content({ size })}>
                <RadixDialog.Content>
                  {children}
                  {withCloseButton && (
                    <Box asChild {...styles.close()}>
                      <RadixDialog.Close aria-label="Close" asChild>
                        <Button
                          appearance="secondary"
                          icon={<CloseIcon />}
                          size="sm"
                        />
                      </RadixDialog.Close>
                    </Box>
                  )}
                </RadixDialog.Content>
              </Paper>
            </RadixDialog.Overlay>
          </Flex>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  },
);

Dialog.displayName = "@optiaxiom/react/Dialog";
