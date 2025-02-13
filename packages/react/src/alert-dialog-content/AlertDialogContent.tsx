import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { useAlertDialogContext } from "../alert-dialog-context";
import { Backdrop } from "../backdrop";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Paper } from "../paper";
import { Transition } from "../transition";
import { TransitionGroup } from "../transition-group";
import * as styles from "./AlertDialogContent.css";

type AlertDialogContentProps = ExcludeProps<
  BoxProps<typeof RadixAlertDialog.Content, styles.DialogVariants>,
  "forceMount"
>;

export const AlertDialogContent = forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ children, size = "sm", style, ...props }, ref) => {
  const { nestedDialogCount, open, presence, setPresence } =
    useAlertDialogContext("AlertDialogContent");

  return (
    <TransitionGroup
      onPresenceChange={setPresence}
      open={open}
      presence={presence}
    >
      <RadixAlertDialog.Portal forceMount>
        <Transition>
          <Backdrop
            asChild
            {...styles.backdrop({ hidden: nestedDialogCount > 0 })}
          >
            <RadixAlertDialog.Overlay />
          </Backdrop>
        </Transition>

        <Flex {...styles.root()}>
          <Box flex="1" pointerEvents="none" />

          <Transition data-side="bottom" type="fade">
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
                {children}
              </RadixAlertDialog.Content>
            </Paper>
          </Transition>

          <Box flex="1" pointerEvents="none" />
          <Box flex="1" pointerEvents="none" />
        </Flex>
      </RadixAlertDialog.Portal>
    </TransitionGroup>
  );
});

AlertDialogContent.displayName = "@optiaxiom/react/AlertDialogContent";
