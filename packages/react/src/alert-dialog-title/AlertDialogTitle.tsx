import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef, type ReactNode } from "react";

import { Flex } from "../flex";
import { Heading, type HeadingProps } from "../heading";
import { Icon } from "../icon";
import { IconTriangleExclamationSolid } from "../icons/IconTriangleExclamationSolid";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";

type AlertDialogTitleProps = HeadingProps<
  typeof RadixAlertDialog.Title,
  {
    /**
     * We show an alert icon before the title by default but this can be replaced with any other icon.
     */
    addonBefore?: ReactNode;
  }
>;

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ addonBefore, children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Flex flexDirection="row" gap="8" p="24" pb="16" {...sprinkleProps}>
      <Icon asChild color="fg.error">
        {addonBefore ? (
          fallbackSpan(addonBefore)
        ) : (
          <IconTriangleExclamationSolid />
        )}
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
