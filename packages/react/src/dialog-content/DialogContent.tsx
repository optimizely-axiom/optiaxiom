import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Flex } from "../flex";
import { CloseIcon } from "./CloseIcon";
import * as styles from "./DialogContent.css";

type ContentProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  ComponentPropsWithRef<typeof RadixDialog.DialogContent>,
  {
    children: ReactNode;
    hideCloseIcon?: boolean;
  }
>;
export const DialogContent = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, hideCloseIcon = false, ...props }, ref) => {
    return (
      <Box asChild>
        <RadixDialog.Portal>
          <Flex asChild {...styles.overlay()}>
            <RadixDialog.Overlay>
              <Box asChild ref={ref} {...styles.content()}>
                <RadixDialog.Content
                  aria-describedby={undefined}
                  ref={ref}
                  {...props}
                >
                  {children}
                  {!hideCloseIcon && (
                    <Box asChild {...styles.close()}>
                      <RadixDialog.Close aria-label="Close" asChild>
                        {CloseIcon}
                      </RadixDialog.Close>
                    </Box>
                  )}
                </RadixDialog.Content>
              </Box>
            </RadixDialog.Overlay>
          </Flex>
        </RadixDialog.Portal>
      </Box>
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
