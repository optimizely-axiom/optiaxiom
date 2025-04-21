import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef, type ReactNode } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Heading } from "../heading";
import { Icon } from "../icon";
import { IconTriangleExclamationSolid } from "../icons/IconTriangleExclamationSolid";
import { fallbackSpan } from "../utils";

type AlertDialogHeaderProps = BoxProps<
  "div",
  {
    /**
     * We show an alert icon before the title by default but this can be replaced with any other icon.
     */
    addonBefore?: ReactNode;
  }
>;

export const AlertDialogHeader = forwardRef<
  HTMLHeadingElement,
  AlertDialogHeaderProps
>(({ addonBefore, children, ...props }, ref) => {
  return (
    <Flex flexDirection="row" gap="8" p="24" pb="16" ref={ref} {...props}>
      <Icon asChild color="fg.error">
        {addonBefore ? (
          fallbackSpan(addonBefore)
        ) : (
          <IconTriangleExclamationSolid />
        )}
      </Icon>

      <Heading asChild color="fg.default" fontWeight="500" level="3">
        <RadixAlertDialog.Title>{children}</RadixAlertDialog.Title>
      </Heading>
    </Flex>
  );
});

AlertDialogHeader.displayName = "@optiaxiom/react/AlertDialogHeader";
