import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { Icon } from "../icon";
import { IconTriangleExclamation } from "../icons/IconTriangleExclamation";
import { extractSprinkles } from "../sprinkles";
import { fallbackSpan } from "../utils";

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
    <Flex flexDirection="row" gap="md" p="lg" pb="md" {...sprinkleProps}>
      {addonBefore && <Icon>{fallbackSpan(addonBefore)}</Icon>}
      {!addonBefore && (
        <Box asChild color="fg.error" h="16" w="auto">
          <IconTriangleExclamation />
        </Box>
      )}

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
