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
  }
>;

/**
 * A pill is a visual representation of an attribute, usually representing tags or metrics.
 *
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
      size = "sm",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : onClick || onDismiss ? "button" : "span";
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box
        asChild
        data-disabled={disabled ? "" : undefined}
        {...styles.pill(
          {
            interactive: Boolean(onClick || onDismiss),
            size,
          },
          className,
        )}
        {...boxProps}
      >
        <Comp
          disabled={disabled}
          onClick={(event) => {
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

          {onDismiss && (
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
