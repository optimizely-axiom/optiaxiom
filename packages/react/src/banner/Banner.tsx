import { createElement, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconCircleCheckFilled } from "../icons/IconCircleCheckFilled";
import { IconCircleExclamationFilled } from "../icons/IconCircleExclamationFilled";
import { IconCircleInfoFilled } from "../icons/IconCircleInfoFilled";
import { IconTriangleExclamationFilled } from "../icons/IconTriangleExclamationFilled";
import { IconX } from "../icons/IconX";
import * as styles from "./Banner.css";

type BannerProps = BoxProps<
  "div",
  {
    onClose?: () => void;
  } & styles.BannerVariants
>;

const iconMap = {
  danger: IconCircleExclamationFilled,
  information: IconCircleInfoFilled,
  neutral: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleExclamationFilled,
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    { children, className, colorScheme = "neutral", onClose, ...props },
    ref,
  ) => {
    return (
      <Flex ref={ref} {...styles.banner({ colorScheme }, className)} {...props}>
        <Box asChild {...styles.icon({})}>
          {createElement(iconMap[colorScheme])}
        </Box>

        <Flex flex="1" gap="xs" mt="2">
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
    );
  },
);

Banner.displayName = "@optiaxiom/react/Banner";
