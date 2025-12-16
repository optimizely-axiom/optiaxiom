import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Icon } from "../icon";
import { IconX } from "../icons/IconX";
import { Text } from "../text";
import * as styles from "./Pill.css";

const Slot = createSlot("@optiaxiom/react/Pill");

export type PillProps = BoxProps<
  "button",
  styles.PillVariants & {
    /**
     * Show a close button inside the pill and invoke this callback when the pill is clicked.
     */
    onDismiss?: () => void;
    /**
     * When true, the pill is rendered as a non-interactive span element instead
     * of a button. Use this for display-only pills that don't respond to
     * clicks.
     */
    readOnly?: boolean;
  }
>;

/**
 * A pill is a visual representation of an attribute, usually representing tags or metrics.
 *
 * @category data-display
 * @since 0.12.4
 * @experimental
 */
export const Pill = forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      asChild,
      children,
      className,
      disabled,
      onClick,
      onDismiss,
      readOnly,
      size = "sm",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : readOnly ? "span" : "button";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box
        asChild
        data-disabled={disabled ? "" : undefined}
        {...styles.pill(
          {
            interactive: Boolean(!readOnly),
            size,
          },
          className,
        )}
        {...boxProps}
      >
        <Comp
          disabled={disabled}
          onClick={(event) => {
            if (readOnly) {
              return;
            }

            onClick?.(event);
            if (event.defaultPrevented) {
              return;
            }

            onDismiss?.();
          }}
          ref={ref}
          {...restProps}
        >
          <Text truncate>{children}</Text>

          {onDismiss && !readOnly && (
            <Icon asChild h="12" ml="auto">
              <IconX />
            </Icon>
          )}
        </Comp>
      </Box>
    );
  },
);

Pill.displayName = "@optiaxiom/react/Pill";
