import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Dialog as RadixDialog } from "radix-ui";
import { useComposedRefs } from "radix-ui/internal";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { Backdrop } from "../backdrop";
import { type BoxProps } from "../box";
import { ModalProvider } from "../modal";
import { Paper } from "../paper";
import { Transition, TransitionGroup } from "../transition";
import { type ExcludeProps, onReactSelectInputBlur } from "../utils";
import * as styles from "./DialogContent.css";
import { useDialogContext } from "./DialogContext";

type DialogContentProps = ExcludeProps<
  BoxProps<
    typeof RadixDialog.Content,
    styles.DialogVariants & {
      transitionType?: ComponentPropsWithoutRef<typeof Transition>["type"];
    }
  >,
  "forceMount"
>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      children,
      className,
      size = "md",
      style,
      transitionType = "fade",
      ...props
    },
    outerRef,
  ) => {
    const { nestedDialogCount, open } = useDialogContext(
      "@optiaxiom/react/DialogContent",
    );

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <TransitionGroup open={open}>
        <RadixDialog.Portal forceMount>
          <Transition>
            <Backdrop
              asChild
              {...styles.backdrop({ hidden: nestedDialogCount > 0 })}
            >
              <RadixDialog.Overlay />
            </Backdrop>
          </Transition>

          <Transition data-side="bottom" type={transitionType}>
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
              <RadixDialog.Content ref={ref}>
                <ModalProvider shardRef={innerRef}>{children}</ModalProvider>
              </RadixDialog.Content>
            </Paper>
          </Transition>
        </RadixDialog.Portal>
      </TransitionGroup>
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
