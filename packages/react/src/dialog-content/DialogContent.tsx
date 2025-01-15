import * as RadixDialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Backdrop } from "../backdrop";
import { type BoxProps } from "../box";
import { useDialogContext } from "../dialog-context";
import { Paper } from "../paper";
import { Transition } from "../transition";
import { TransitionGroup } from "../transition-group";
import { type ExcludeProps, onReactSelectInputBlur } from "../utils";
import * as styles from "./DialogContent.css";

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
    ref,
  ) => {
    const { isRootDialog, nestedDialogCount, open } =
      useDialogContext("DialogContent");
    const BackdropContainer = isRootDialog ? Transition : VisuallyHidden;

    return (
      <TransitionGroup open={open}>
        <RadixDialog.Portal forceMount>
          <BackdropContainer>
            <Backdrop asChild>
              <RadixDialog.Overlay />
            </Backdrop>
          </BackdropContainer>

          <Transition data-side="bottom" type={transitionType}>
            <Paper
              asChild
              elevation={size === "fullscreen" ? "drawer" : "dialog"}
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
                {children}

                <VisuallyHidden>
                  <RadixDialog.Description />
                </VisuallyHidden>

                {nestedDialogCount > 0 && (
                  <Transition>
                    <Backdrop rounded="inherit" />
                  </Transition>
                )}
              </RadixDialog.Content>
            </Paper>
          </Transition>
        </RadixDialog.Portal>
      </TransitionGroup>
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
