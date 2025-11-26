import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";
import * as styles from "./Badge.css";

const Slot = createSlot("@optiaxiom/react/Badge");

export type BadgeProps = TextProps<"span", styles.BadgeVariants>;

/**
 * Use to emphasize a status, count, state or value.
 *
 * @example <caption>Basic badge (default neutral badge)</caption>
 * <Badge>Default</Badge>
 *
 * @example <caption>Badges with different intent colors</caption>
 * <Badge intent="primary">Primary</Badge>
 * <Badge intent="information">Info</Badge>
 * <Badge intent="success">Success</Badge>
 * <Badge intent="warning">Warning</Badge>
 * <Badge intent="danger">Error</Badge>
 *
 * @example <caption>Badge variants (strong vs subtle badge styles)</caption>
 * <Badge intent="primary" variant="subtle">Subtle</Badge>
 * <Badge intent="primary" variant="strong">Strong</Badge>
  *
  * @since 0.1.0
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      asChild,
      children,
      className,
      intent = "neutral",
      variant = "subtle",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Text
        asChild
        {...styles.badge({ intent, variant }, className)}
        {...props}
      >
        <Comp ref={ref}>{children}</Comp>
      </Text>
    );
  },
);

Badge.displayName = "@optiaxiom/react/Badge";
