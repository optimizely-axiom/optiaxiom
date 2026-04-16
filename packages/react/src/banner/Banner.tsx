import {
  IconCheckCircleSolid,
  IconCircleExclamation,
  IconCircleInfo,
  IconTriangleExclamation,
  IconXmark,
} from "@optiaxiom/icons";
import { useId } from "@radix-ui/react-id";
import { createElement, forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Group } from "../group";
import { Icon } from "../icon";
import * as styles from "./Banner.css";

export type BannerProps = BoxProps<
  "div",
  styles.BannerVariants & {
    /**
     * Show a close button inside the banner and invoke this callback when the close button is clicked.
     */
    onDismiss?: () => void;
  }
>;

const mapIntentToIcon = {
  danger: IconCircleExclamation,
  information: IconCircleInfo,
  neutral: IconCircleInfo,
  success: IconCheckCircleSolid,
  warning: IconTriangleExclamation,
};

/**
 * Display a prominent message at the top of the screen.
 *
 * @category feedback
 * @category layout
 * @since 0.1.0
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ children, className, intent = "neutral", onDismiss, ...props }, ref) => {
    const labelId = useId();

    return (
      <Group
        aria-labelledby={labelId}
        ref={ref}
        role="alert"
        {...styles.banner({ intent }, className)}
        {...props}
      >
        <Icon asChild {...styles.icon({ intent })}>
          {createElement(mapIntentToIcon[intent], { filled: true })}
        </Icon>
        <Group id={labelId} {...styles.content()}>
          {children}
        </Group>
        {!!onDismiss && (
          <Button
            appearance="subtle"
            aria-label="close"
            color="fg.default"
            flex="none"
            icon={<IconXmark />}
            onClick={onDismiss}
            size="sm"
          />
        )}
      </Group>
    );
  },
);

Banner.displayName = "@optiaxiom/react/Banner";
