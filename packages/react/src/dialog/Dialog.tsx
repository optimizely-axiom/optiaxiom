import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./Dialog.css";

type DialogProps = ComponentPropsWithRef<typeof RadixDialog.Root> &
  styles.DialogVariants;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, size = "md", ...props }, ref) => {
    // console.log(size);
    return (
      <Box asChild ref={ref} {...styles.dialog({ size })} {...props}>
        <RadixDialog.Root>{children}</RadixDialog.Root>
      </Box>
    );
  },
);

Dialog.displayName = "@optiaxiom/react/Dialog";
