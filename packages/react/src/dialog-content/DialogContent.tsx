import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { AnimatePresence } from "../animate-presence";
import { Backdrop } from "../backdrop";
import { type BoxProps } from "../box";
import { useDialogContext } from "../dialog-context";
import { Paper } from "../paper";
import { Transition } from "../transition";
import * as styles from "./DialogContent.css";

type DialogContentProps = BoxProps<
  typeof RadixDialog.Content,
  {
    transitionType?: ComponentPropsWithoutRef<typeof Transition>["type"];
  } & styles.DialogVariants
>;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    { children, className, size = "md", transitionType = "fade", ...props },
    ref,
  ) => {
    const { open } = useDialogContext("DialogContent");

    return (
      <AnimatePresence>
        {open && (
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
                {...styles.content({ size }, className)}
                {...props}
              >
                <RadixDialog.Content ref={ref}>{children}</RadixDialog.Content>
              </Paper>
            </Transition>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    );
  },
);

DialogContent.displayName = "@optiaxiom/react/DialogContent";
