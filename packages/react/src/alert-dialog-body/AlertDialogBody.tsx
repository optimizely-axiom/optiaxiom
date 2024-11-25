import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./AlertDialogBody.css";

type AlertDialogBodyProps = BoxProps<typeof RadixAlertDialog.Description>;

export const AlertDialogBody = forwardRef<
  HTMLParagraphElement,
  AlertDialogBodyProps
>(({ children, className, ...props }, ref) => {
  return (
    <Box asChild {...styles.body({}, className)} ref={ref} {...props}>
      <RadixAlertDialog.Description>{children}</RadixAlertDialog.Description>
    </Box>
  );
});

AlertDialogBody.displayName = "@optiaxiom/react/AlertDialogBody";
