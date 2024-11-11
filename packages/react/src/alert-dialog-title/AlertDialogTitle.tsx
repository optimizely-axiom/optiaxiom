import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef, type ReactNode } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Icon } from "../icon";
import { IconTriangleExclamationFilled } from "../icons/IconTriangleExclamationFilled";
import { extractSprinkles } from "../sprinkles";

type AlertDialogTitleProps = BoxProps<
  typeof RadixAlertDialog.Title,
  {
    addonBefore?: ReactNode;
  }
>;

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ addonBefore, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Flex flexDirection="row" gap="xs" p="lg" pb="md" {...sprinkleProps}>
      <Icon asChild color="fg.error">
        {addonBefore ?? <IconTriangleExclamationFilled />}
      </Icon>

      <Heading
        asChild
        color="fg.default"
        fontWeight="500"
        level="3"
        ref={ref}
        {...restProps}
      >
        <RadixAlertDialog.Title>{children}</RadixAlertDialog.Title>
      </Heading>
    </Flex>
  );
});

AlertDialogTitle.displayName = "@optiaxiom/react/AlertDialogTitle";
