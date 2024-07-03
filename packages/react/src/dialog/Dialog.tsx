import * as RadixDialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type DialogProps = ComponentPropsWithRef<typeof RadixDialog.Root>;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box asChild {...props} ref={ref}>
        <RadixDialog.Root>{children}</RadixDialog.Root>
      </Box>
    );
  },
);

Dialog.displayName = "@optiaxiom/react/Dialog";
