import { useId } from "@reach/auto-id";
import { createElement, forwardRef } from "react";

import { AlertContextProvider } from "../alert-context";
import { type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconCircleCheckFilled } from "../icons/IconCircleCheckFilled";
import { IconCircleExclamationFilled } from "../icons/IconCircleExclamationFilled";
import { IconCircleInfoFilled } from "../icons/IconCircleInfoFilled";
import { IconTriangleExclamationFilled } from "../icons/IconTriangleExclamationFilled";
import { IconX } from "../icons/IconX";
import * as styles from "./Alert.css";

type AlertProps = BoxProps<
  "div",
  {
    onClose?: () => void;
  } & styles.AlertVariants
>;

const iconMap = {
  danger: IconCircleExclamationFilled,
  information: IconCircleInfoFilled,
  neutral: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleExclamationFilled,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { children, className, colorScheme = "neutral", onClose, ...props },
    ref,
  ) => {
    const descriptionId = useId();
    const labelId = useId();

    return (
      <AlertContextProvider descriptionId={descriptionId} labelId={labelId}>
        <Flex
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          ref={ref}
          role="alert"
          {...styles.alert({ colorScheme }, className)}
          {...props}
        >
          <Icon asChild {...styles.icon({ colorScheme })}>
            {createElement(iconMap[colorScheme])}
          </Icon>

          <Flex flex="1" gap="xs" my="2">
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
