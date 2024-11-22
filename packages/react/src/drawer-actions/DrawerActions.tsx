import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconX } from "../icons/IconX";
import * as styles from "./DrawerActions.css";

type DrawerActionsProps = BoxProps;

export const DrawerActions = forwardRef<HTMLHeadingElement, DrawerActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.actions({}, className)} {...props}>
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

DrawerActions.displayName = "@optiaxiom/react/DrawerActions";
