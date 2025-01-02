import * as RadixDialog from "@radix-ui/react-dialog";
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
    { children, className, size = "md", transitionType = "fade", ...props },
    ref,
  ) => {
    const { open } = useDialogContext("DialogContent");

    return (
      <TransitionGroup open={open}>
        <RadixDialog.Portal forceMount>
          <Transition>
            <Backdrop asChild>
              <RadixDialog.Overlay />
            </Backdrop>
          </Transition>

          <Transition data-side="bottom" type={transitionType}>
            <Paper
              asChild
              elevation={size === "fullscreen" ? "drawer" : "dialog"}
              onBlur={onReactSelectInputBlur}
              {...styles.content({ size }, className)}
              {...props}
            >
              <RadixDialog.Content ref={ref}>{children}</RadixDialog.Content>
            </Paper>
          </Transition>
        </RadixDialog.Portal>
      </TransitionGroup>
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
