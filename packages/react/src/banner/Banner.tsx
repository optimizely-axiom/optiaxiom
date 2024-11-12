import { useId } from "@reach/auto-id";
import { createElement, forwardRef } from "react";

import { BannerContextProvider } from "../banner-context";
import { type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Icon } from "../icon";
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

const mapIntentToIcon = {
  danger: IconCircleExclamationFilled,
  information: IconCircleInfoFilled,
  neutral: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleExclamationFilled,
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ children, className, intent = "neutral", onClose, ...props }, ref) => {
    const descriptionId = useId();
    const labelId = useId();

    return (
      <BannerContextProvider descriptionId={descriptionId} labelId={labelId}>
        <Flex
          aria-describedby={descriptionId}
          aria-labelledby={labelId}
          ref={ref}
          role="alert"
          {...styles.banner({ intent }, className)}
          {...props}
        >
          <Icon asChild {...styles.icon({ intent })}>
            {createElement(mapIntentToIcon[intent])}
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
      </BannerContextProvider>
    );
  },
);

Banner.displayName = "@optiaxiom/react/Banner";
