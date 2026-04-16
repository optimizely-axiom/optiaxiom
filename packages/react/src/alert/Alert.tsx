import {
  IconCheckCircle,
  IconClose,
  IconError,
  IconInfo,
  IconWarning,
} from "@optiaxiom/icons";
import { useId } from "@radix-ui/react-id";
import { createElement, forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Group } from "../group";
import { Icon } from "../icon";
import { IconOpal } from "../icons/IconOpal";
import * as styles from "./Alert.css";

export type AlertProps = BoxProps<
  "div",
  styles.AlertVariants & {
    /**
     * Show a close button inside the alert and invoke this callback when the close button is clicked.
     */
    onDismiss?: () => void;
  }
>;

const mapIntentToIcon = {
  danger: IconError,
  information: IconInfo,
  neutral: IconInfo,
  opal: IconOpal,
  success: IconCheckCircle,
  warning: IconWarning,
};

/**
 * Keeps users informed of important and sometimes time-sensitive changes.
 *
 * Important Notes:
 * - The `intent` prop uses "information" (not "info") for the blue
 *   informational style
 * - Default intent is "neutral" - only set intent when you need a specific
 *   color/emphasis
 *
 * @category feedback
 * @since 0.1.0
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, className, intent = "neutral", onDismiss, ...props }, ref) => {
    const labelId = useId();

    return (
      <Group
        aria-labelledby={labelId}
        ref={ref}
        role="alert"
        {...styles.alert({ intent }, className)}
        {...props}
      >
        <Icon asChild {...styles.icon({ intent })}>
          {intent === "opal" ? (
            <IconOpal />
          ) : (
            createElement(mapIntentToIcon[intent], { filled: true })
          )}
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
            icon={<IconClose />}
            onClick={onDismiss}
            size="sm"
          />
        )}
      </Group>
    );
  },
);

Alert.displayName = "@optiaxiom/react/Alert";
