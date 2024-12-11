import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconX } from "../icons/IconX";
import * as styles from "./DialogActions.css";

type DialogActionsProps = BoxProps;

export const DialogActions = forwardRef<HTMLHeadingElement, DialogActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.actions({}, className)} {...props}>
        <Button appearance="subtle" aria-label="Close" asChild icon={<IconX />}>
          <RadixDialog.Close />
        </Button>

        <Flex flexDirection="row" gap="8">
          {children}
        </Flex>
      </Flex>
    );
  },
);

DialogActions.displayName = "@optiaxiom/react/DialogActions";
