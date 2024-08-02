import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconDanger } from "../icons/IconDanger";
import { IconInfoCircle } from "../icons/IconInfoCircle";
import { IconSuccess } from "../icons/IconSuccess";
import { IconWarning } from "../icons/IconWarning";
import { IconX } from "../icons/IconX";
import * as styles from "./Alert.css";

type AlertProps = BoxProps<
  "div",
  {
    onClose?: () => void;
  } & styles.AlertVariants
>;

const iconMap = new Map([
  ["danger", IconDanger],
  ["information", IconInfoCircle],
  ["success", IconSuccess],
  ["warning", IconWarning],
]);

const getIcon = (colorScheme: string) => {
  const IconComponent = iconMap.get(colorScheme);
  return IconComponent ? <IconComponent /> : null;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      className,
      colorScheme = "information",
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
          <Box asChild flex="none" size="xs">
            {getIcon(colorScheme)}
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
