import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./AlertDialogDescription.css";

type AlertDialogDescriptionProps = BoxProps<
  typeof RadixAlertDialog.Description
>;

export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <Box asChild {...styles.body({}, className)} ref={ref} {...props}>
      <RadixAlertDialog.Description>{children}</RadixAlertDialog.Description>
    </Box>
  );
});

AlertDialogDescription.displayName = "@optiaxiom/react/AlertDialogDescription";
