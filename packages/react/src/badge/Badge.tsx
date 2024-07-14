import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./Badge.css";

type BadgeProps = ComponentPropsWithRef<typeof Flex> & styles.BadgeVariants;

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
        {...styles.badge({ colorScheme, variant }, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

Badge.displayName = "@optiaxiom/react/Badge";
