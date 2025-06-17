import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixDialog from "@radix-ui/react-dialog";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef, useRef } from "react";

import { Backdrop } from "../backdrop";
import { type BoxProps } from "../box";
import { FocusBookmarkProvider } from "../focus-bookmark";
import { ModalProvider } from "../modal";
import { Paper } from "../paper";
import { Portal } from "../portal";
import { Transition, TransitionGroup } from "../transition";
import { type ExcludeProps, onReactSelectInputBlur } from "../utils";
import * as styles from "./DialogContent.css";
import { DialogContentImpl } from "./DialogContentImpl";
import { useDialogContext } from "./DialogContext";

export type DialogContentProps = ExcludeProps<
  BoxProps<typeof RadixDialog.Content, styles.DialogVariants>,
  "forceMount"
>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, size = "md", style, ...props }, outerRef) => {
    const { nestedDialogCount, open } = useDialogContext(
      "@optiaxiom/react/DialogContent",
    );

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <TransitionGroup open={open}>
        <Portal asChild>
          <Transition>
            <Backdrop
              asChild
              {...styles.backdrop({ hidden: nestedDialogCount > 0 })}
            >
              <RadixDialog.Overlay forceMount />
            </Backdrop>
          </Transition>
        </Portal>

        <Portal asChild>
          <Transition type="pop">
            <Paper
              asChild
              elevation={size === "fullscreen" ? "screen" : "dialog"}
              onBlur={onReactSelectInputBlur}
              style={{
                ...assignInlineVars({
                  [styles.nestedDialogCountVar]: `${nestedDialogCount}`,
                }),
                ...style,
              }}
              {...styles.content({ size }, className)}
              {...props}
            >
              <RadixDialog.Content asChild forceMount ref={ref}>
                <DialogContentImpl>
                  <ModalProvider shardRef={innerRef}>
                    <FocusBookmarkProvider containerRef={innerRef}>
                      {children}
                    </FocusBookmarkProvider>
                  </ModalProvider>
                </DialogContentImpl>
              </RadixDialog.Content>
            </Paper>
          </Transition>
        </Portal>
      </TransitionGroup>
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
