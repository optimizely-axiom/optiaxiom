import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef, useRef } from "react";

import type { ExcludeProps } from "../utils";

import { Backdrop } from "../backdrop";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { FocusBookmarkProvider } from "../focus-bookmark";
import { ModalProvider } from "../modal";
import { Paper } from "../paper";
import { Portal } from "../portal";
import { Transition, TransitionGroup } from "../transition";
import * as styles from "./AlertDialogContent.css";
import { useAlertDialogContext } from "./AlertDialogContext";

export type AlertDialogContentProps = ExcludeProps<
  BoxProps<typeof RadixAlertDialog.Content, styles.DialogVariants>,
  "forceMount"
>;

export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ children, size = "sm", style, ...props }, outerRef) => {
  const { nestedDialogCount, open, presence, setPresence } =
    useAlertDialogContext("@optiaxiom/react/AlertDialogContent");

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
            <RadixAlertDialog.Overlay />
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
              <RadixAlertDialog.Content ref={ref} {...props}>
                <ModalProvider shardRef={innerRef}>
                  <FocusBookmarkProvider containerRef={innerRef}>
                    {children}
                  </FocusBookmarkProvider>
                </ModalProvider>
              </RadixAlertDialog.Content>
            </Paper>
          </Transition>

          <Box flex="1" pointerEvents="none" />
          <Box flex="1" pointerEvents="none" />
        </Flex>
      </Portal>
    </TransitionGroup>
  );
});

AlertDialogContent.displayName = "@optiaxiom/react/AlertDialogContent";
