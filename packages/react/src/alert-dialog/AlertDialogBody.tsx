import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";

export type AlertDialogBodyProps = BoxProps<typeof RadixDialog.Description>;

/**
 * @group AlertDialog
 */
export const AlertDialogBody = forwardRef<HTMLDivElement, AlertDialogBodyProps>(
  ({ children, ...props }, ref) => (
    <Group
      asChild
      flex="1"
      flexDirection="column"
      fontSize="md"
      gap="16"
      px="24"
      py="16"
      ref={ref}
      z="0"
      {...props}
    >
      <RadixDialog.Description asChild>
        <div>{children}</div>
      </RadixDialog.Description>
    </Group>
  ),
);

AlertDialogBody.displayName = "@optiaxiom/react/AlertDialogBody";
