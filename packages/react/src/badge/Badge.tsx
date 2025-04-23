import { Slot as RadixSlot } from "radix-ui";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";
import * as styles from "./Badge.css";

const Slot = RadixSlot.createSlot("@optiaxiom/react/Badge");

type BadgeProps = TextProps<"span", styles.BadgeVariants>;

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
