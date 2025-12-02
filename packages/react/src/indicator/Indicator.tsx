import { createSlot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

import { Badge } from "../badge";
import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./Indicator.css";

const Slot = createSlot("@optiaxiom/react/Indicator");

export type IndicatorProps = BoxProps<
  typeof Badge,
  {
    /**
     * Set the content of the badge.
     */
    content?: ReactNode;
    /**
     * Whether to show or hide badge.
     */
    disabled?: boolean;
    /**
     * Whether to offset the badge and display slightly outside the content box.
     */
    offset?: boolean;
    /**
     * Whether to show a ping animation for the badge.
     */
    ping?: boolean;
    /**
     * Set which corner the badge is displayed.
     */
    position?: "bottom-right" | "top-right";
  }
>;

/**
 * Display a badge at the corner of another element.
 *
 * @category data-display
 * @category feedback
 * @since 0.1.0
 */
export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  (
    {
      asChild,
      children,
      className,
      content,
      disabled,
      intent,
      offset = true,
      ping,
      position = "top-right",
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <Flex ref={ref} {...styles.indicator({}, className)} {...props}>
        {children}

        {!disabled && (
          <Box {...styles.floating({ offset, position })}>
            {ping && (
              <Slot
                aria-hidden="true"
                {...styles.badge({ offset, ping: true })}
              >
                {asChild ? (
                  content
                ) : (
                  <Badge intent={intent} variant={variant}>
                    {content}
                  </Badge>
                )}
              </Slot>
            )}

            <Slot {...styles.badge({ offset })}>
              {asChild ? (
                content
              ) : (
                <Badge intent={intent} variant={variant}>
                  {content}
                </Badge>
              )}
            </Slot>
          </Box>
        )}
      </Flex>
    );
  },
);

Indicator.displayName = "@optiaxiom/react/Indicator";
