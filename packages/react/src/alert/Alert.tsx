import { createElement, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
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
  neutral: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleExclamationFilled,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      className,
      colorScheme = "neutral",
      onClose,
      variant = "light",
      ...props
    },
    ref,
  ) => {
    return (
      <Flex
        ref={ref}
        {...styles.alert({ colorScheme, variant }, className)}
        {...props}
      >
        <Flex alignItems="start" flexDirection="row" gap="xs" mt="2">
          <Box asChild {...styles.icon()}>
            {createElement(iconMap[colorScheme])}
          </Box>
          <Flex flex="1" flexDirection="column" gap="xs" overflow="hidden">
            {children}
          </Flex>
        </Flex>
        {!!onClose && (
          <Button
            appearance="secondary"
            aria-label="close"
            color="fg.default"
            flex="none"
            icon={<IconX />}
            onClick={onClose}
            size="sm"
          />
        )}
      </Flex>
    );
  },
);

Alert.displayName = "@optiaxiom/react/Alert";
