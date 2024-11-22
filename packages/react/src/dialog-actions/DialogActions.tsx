import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconX } from "../icons/IconX";

type DialogActionsProps = BoxProps;

export const DialogActions = forwardRef<HTMLHeadingElement, DialogActionsProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex flexDirection="row-reverse" gap="xs" ref={ref} {...props}>
        <Button appearance="subtle" aria-label="Close" asChild icon={<IconX />}>
          <RadixDialog.Close />
        </Button>

        <Flex flexDirection="row" gap="xs">
          {children}
        </Flex>
      </Flex>
    );
  },
);

DialogActions.displayName = "@optiaxiom/react/DialogActions";
