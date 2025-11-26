import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

export type AlertDialogBodyProps = BoxProps<typeof RadixDialog.Description>;

/**
 * @group AlertDialog
 */
export const AlertDialogBody = forwardRef<HTMLDivElement, AlertDialogBodyProps>(
  ({ children, ...props }, ref) => (
    <Flex
      asChild
      flex="1"
      fontSize="md"
      px="24"
      py="16"
      ref={ref}
      z="0"
      {...props}
    >
      <RadixDialog.Description asChild>
        <div>{children}</div>
      </RadixDialog.Description>
    </Flex>
  ),
);

AlertDialogBody.displayName = "@optiaxiom/react/AlertDialogBody";
