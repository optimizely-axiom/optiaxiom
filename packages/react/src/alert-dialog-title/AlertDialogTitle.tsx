import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Heading } from "../heading";

type AlertDialogTitleProps = BoxProps<typeof RadixAlertDialog.Title>;

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ children, ...props }, ref) => {
  return (
    <Heading
      asChild
      fontWeight="500"
      level="3"
      pb="16"
      pt="24"
      px="24"
      ref={ref}
      {...props}
    >
      <RadixAlertDialog.Title>{children}</RadixAlertDialog.Title>
    </Heading>
  );
});

AlertDialogTitle.displayName = "@optiaxiom/react/AlertDialogTitle";
