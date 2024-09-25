import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { IconTriangleExclamation } from "../icons/IconTriangleExclamation";
import { extractSprinkles } from "../sprinkles";

type AlertDialogTitleProps = BoxProps<typeof RadixAlertDialog.Title>;

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ children, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);
  return (
    <Flex flexDirection="row" gap="md" p="lg" pb="md" {...sprinkleProps}>
      <Box asChild color="fg.accent.red" h="16" w="auto">
        <IconTriangleExclamation />
      </Box>

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
