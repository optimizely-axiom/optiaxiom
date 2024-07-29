import { forwardRef } from "react";

import { Text, type TextProps } from "../text";
import * as styles from "./Badge.css";

type BadgeProps = TextProps<"span", styles.BadgeVariants>;

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      asChild,
      children,
      className,
      colorScheme = "neutral",
      variant = "light",
      ...props
    },
    ref,
  ) => {
    return (
      <Text
        as="span"
        asChild={asChild}
        ref={ref}
        role="presentation"
        {...styles.badge({ colorScheme, variant }, className)}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

Badge.displayName = "@optiaxiom/react/Badge";
