import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Heading } from "../heading";
import { Icon } from "../icon";
import { fallbackSpan } from "../utils";
import * as styles from "./AlertDialogHeader.css";

export type AlertDialogHeaderProps = BoxProps<
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
>(({ addonBefore, children, className, ...props }, ref) => {
  return (
    <Flex ref={ref} {...styles.header({}, className)} {...props}>
      <Icon asChild color="fg.error">
        {addonBefore && fallbackSpan(addonBefore)}
      </Icon>

      <Heading asChild color="fg.default" fontWeight="500" level="3">
        <RadixDialog.Title>{children}</RadixDialog.Title>
      </Heading>
    </Flex>
  );
});

AlertDialogHeader.displayName = "@optiaxiom/react/AlertDialogHeader";
