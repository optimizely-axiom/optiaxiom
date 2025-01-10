import { useId } from "@radix-ui/react-id";
import { createElement, forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconCircleCheckSolid } from "../icons/IconCircleCheckSolid";
import { IconCircleExclamationSolid } from "../icons/IconCircleExclamationSolid";
import { IconCircleInfoSolid } from "../icons/IconCircleInfoSolid";
import { IconTriangleExclamationSolid } from "../icons/IconTriangleExclamationSolid";
import { IconX } from "../icons/IconX";
import * as styles from "./Banner.css";

type BannerProps = BoxProps<
  "div",
  styles.BannerVariants & {
    /**
     * Show a close button inside the banner and invoke this callback when the close button is clicked.
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

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ children, className, intent = "neutral", onClose, ...props }, ref) => {
    const labelId = useId();

    return (
      <Flex
        aria-labelledby={labelId}
        ref={ref}
        role="alert"
        {...styles.banner({ intent }, className)}
        {...props}
      >
        <Icon asChild {...styles.icon({ intent })}>
          {createElement(mapIntentToIcon[intent])}
        </Icon>

        <Flex flex="1" gap="8" id={labelId} my="2">
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
