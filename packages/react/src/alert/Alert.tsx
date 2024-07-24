import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconDanger } from "../icons/IconDanger";
import { IconInfoCircle } from "../icons/IconInfoCircle";
import { IconSuccess } from "../icons/IconSuccess";
import { IconWarning } from "../icons/IconWarning";
import { IconX } from "../icons/IconX";
import { Text } from "../text";
import * as styles from "./Alert.css";

type AlertProps = BoxProps<
  "div",
  {
    children: ReactNode;
    onClose?: () => void;
    title?: ReactNode;
  } & styles.AlertVariants
>;

const iconMap = new Map([
  ["danger", IconDanger],
  ["info", IconInfoCircle],
  ["success", IconSuccess],
  ["warning", IconWarning],
]);

const getIcon = (type: string) => {
  const IconComponent = iconMap.get(type);
  return IconComponent ? <IconComponent /> : null;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, onClose, size = "md", title, type = "info", ...props }, ref) => {
    return (
      <Flex ref={ref} {...styles.alert({ size, type })} {...props}>
        <Flex alignItems="start" flexDirection="row" gap="xs" pl="md">
          <Box asChild {...styles.startDecorator()}>
            {getIcon(type)}
          </Box>
          <Flex {...styles.content()}>
            {title && <Text fontWeight="600">{title}</Text>}
            <Box fontSize="md" fontWeight="400">
              {children}
            </Box>
          </Flex>
        </Flex>
        <Flex {...styles.close()}>
          <Button
            appearance="secondary"
            color={type == "warning" ? "fg.default" : "white"}
            icon={<IconX />}
            onClick={onClose}
            px="2"
            py="4"
          />
        </Flex>
      </Flex>
    );
  },
);

Alert.displayName = "@optiaxiom/react/Alert";
