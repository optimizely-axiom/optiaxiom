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
import * as styles from "./AsideContent.css";
import { useDialogContext } from "./AsideContext";

export type AsideContentProps = ExcludeProps<
  BoxProps<typeof RadixDialog.Content, styles.AsideVariants>,
  "forceMount"
>;

const mapPositionToTransitionSide = {
  bottom: "top",
  left: "right",
  right: "left",
} as const;

export const AsideContent = forwardRef<HTMLDivElement, AsideContentProps>(
  (
    { children, className, position = "right", size = "md", style, ...props },
    outerRef,
  ) => {
    const { nestedDialogCount, open } = useDialogContext(
      "@optiaxiom/react/AsideContent",
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
          <Transition
            data-side={mapPositionToTransitionSide[position]}
            type="pop"
          >
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
              {...styles.content({ position, size }, className)}
              {...props}
            >
              <RadixDialog.Content forceMount ref={ref}>
                <ModalProvider shardRef={innerRef}>
                  <FocusBookmarkProvider containerRef={innerRef}>
                    {children}
                  </FocusBookmarkProvider>
                </ModalProvider>
              </RadixDialog.Content>
            </Paper>
          </Transition>
        </Portal>
      </TransitionGroup>
    );
  },
);

AsideContent.displayName = "@optiaxiom/react/AsideContent";
