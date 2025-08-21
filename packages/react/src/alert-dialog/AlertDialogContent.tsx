import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixDialog from "@radix-ui/react-dialog";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef, useContext, useRef } from "react";

import type { ExcludeProps } from "../utils";

import { Backdrop } from "../backdrop";
import { Box, type BoxProps } from "../box";
import { DialogKitContext } from "../dialog-kit/internals";
import { Flex } from "../flex";
import { FocusBookmarkProvider } from "../focus-bookmark";
import { ModalProvider } from "../modal";
import { Paper } from "../paper";
import { Portal } from "../portal";
import { Transition, TransitionGroup } from "../transition";
import * as styles from "./AlertDialogContent.css";
import { useAlertDialogContext } from "./AlertDialogContext";

export type AlertDialogContentProps = ExcludeProps<
  BoxProps<typeof RadixDialog.Content, styles.DialogVariants>,
  "forceMount"
>;

export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(
  (
    {
      children,
      onCloseAutoFocus,
      onEscapeKeyDown,
      onOpenAutoFocus,
      size = "sm",
      style,
      ...props
    },
    outerRef,
  ) => {
    const { cancelRef, nestedDialogCount, open, presence, setPresence } =
      useAlertDialogContext("@optiaxiom/react/AlertDialogContent");
    const { onClose, onDismiss } = useContext(DialogKitContext) ?? {};

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <TransitionGroup
        onPresenceChange={setPresence}
        open={open}
        presence={presence}
      >
        <Portal>
          <Transition>
            <Backdrop
              asChild
              onClick={() => {
                innerRef.current?.animate(
                  [
                    { translate: "6px" },
                    { translate: "-4px" },
                    { translate: "4px" },
                  ],
                  {
                    duration: 150,
                  },
                );
              }}
              {...styles.backdrop({ hidden: nestedDialogCount > 0 })}
            >
              <RadixDialog.Overlay />
            </Backdrop>
          </Transition>

          <Flex {...styles.root()}>
            <Box flex="1" pointerEvents="none" />

            <Transition type="pop">
              <Paper
                asChild
                elevation="dialog"
                style={{
                  ...assignInlineVars({
                    [styles.nestedDialogCountVar]: `${nestedDialogCount}`,
                  }),
                  ...style,
                }}
                {...styles.content({ size })}
              >
                <RadixDialog.Content
                  onCloseAutoFocus={(event) => {
                    onCloseAutoFocus?.(event);
                    onClose?.();
                  }}
                  onEscapeKeyDown={(event) => {
                    if (onDismiss) {
                      onDismiss(event, "cancel");
                      if (event.defaultPrevented) {
                        return;
                      }
                    }
                    onEscapeKeyDown?.(event);
                  }}
                  onOpenAutoFocus={(event) => {
                    onOpenAutoFocus?.(event);
                    if (event.defaultPrevented) {
                      return;
                    }

                    event.preventDefault();
                    cancelRef.current?.focus({ preventScroll: true });
                  }}
                  ref={ref}
                  role="alertdialog"
                  {...props}
                  onInteractOutside={(event) => event.preventDefault()}
                  onPointerDownOutside={(event) => event.preventDefault()}
                >
                  <ModalProvider shardRef={innerRef}>
                    <FocusBookmarkProvider containerRef={innerRef}>
                      {children}
                    </FocusBookmarkProvider>
                  </ModalProvider>
                </RadixDialog.Content>
              </Paper>
            </Transition>

            <Box flex="1" pointerEvents="none" />
            <Box flex="1" pointerEvents="none" />
          </Flex>
        </Portal>
      </TransitionGroup>
    );
  },
);

AlertDialogContent.displayName = "@optiaxiom/react/AlertDialogContent";
