import { forwardRef } from "react";

import { Text, type TextProps } from "../text";
import * as styles from "./Badge.css";

type BadgeProps = TextProps<"span", styles.BadgeVariants>;

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      className,
      colorScheme = "neutral",
      variant = "solid",
      ...props
    },
    ref,
  ) => {
    return (
      <Text
        as="span"
        ref={ref}
        {...styles.badge({ colorScheme, variant }, className)}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

Badge.displayName = "@optiaxiom/react/Badge";
