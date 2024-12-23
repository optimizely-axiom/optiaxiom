import { useId } from "@reach/auto-id";
import { createElement, forwardRef } from "react";

import { AlertContextProvider } from "../alert-context";
import { type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconCircleCheckSolid } from "../icons/IconCircleCheckSolid";
import { IconCircleExclamationSolid } from "../icons/IconCircleExclamationSolid";
import { IconCircleInfoSolid } from "../icons/IconCircleInfoSolid";
import { IconTriangleExclamationSolid } from "../icons/IconTriangleExclamationSolid";
import { IconX } from "../icons/IconX";
import * as styles from "./Alert.css";

type AlertProps = BoxProps<
  "div",
  styles.AlertVariants & {
    /**
     * Show a close button inside the alert and invoke this callback when the close button is clicked.
     */
    onClose?: () => void;
  }
>;

const mapIntentToIcon = {
  danger: IconCircleExclamationSolid,
  information: IconCircleInfoSolid,
  neutral: IconCircleInfoSolid,
  success: IconCircleCheckSolid,
  warning: IconTriangleExclamationSolid,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, className, intent = "neutral", onClose, ...props }, ref) => {
    const descriptionId = useId();
    const labelId = useId();

    return (
      <AlertContextProvider descriptionId={descriptionId} labelId={labelId}>
        <Flex
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          ref={ref}
          role="alert"
          {...styles.alert({ intent }, className)}
          {...props}
        >
          <Icon asChild {...styles.icon({ intent })}>
            {createElement(mapIntentToIcon[intent])}
          </Icon>

          <Flex flex="1" gap="8" my="2">
            {children}
          </Flex>

          {!!onClose && (
            <Button
              appearance="subtle"
              aria-label="close"
              color="fg.default"
              flex="none"
              icon={<IconX />}
              onClick={onClose}
              size="sm"
            />
          )}
        </Flex>
      </AlertContextProvider>
    );
  },
);

Alert.displayName = "@optiaxiom/react/Alert";
