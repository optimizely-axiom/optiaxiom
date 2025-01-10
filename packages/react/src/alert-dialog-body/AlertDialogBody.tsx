import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type AlertDialogBodyProps = BoxProps<typeof RadixAlertDialog.Description>;

export const AlertDialogBody = forwardRef<HTMLDivElement, AlertDialogBodyProps>(
  ({ children, ...props }, ref) => (
    <Flex
      asChild
      flex="1"
      fontSize="md"
      justifyContent="start"
      overflow="auto"
      px="24"
      py="16"
      ref={ref}
      {...props}
    >
      <RadixAlertDialog.Description asChild>
        <div>{children}</div>
      </RadixAlertDialog.Description>
    </Flex>
  ),
);

AlertDialogBody.displayName = "@optiaxiom/react/AlertDialogBody";
