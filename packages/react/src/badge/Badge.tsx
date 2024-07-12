import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./Badge.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "accent" },
  info: { colorScheme: "info", variant: "accent" },
  neutral: { colorScheme: "neutral", variant: "accent" },
  primary: { colorScheme: "primary", variant: "subtle" },
  success: { colorScheme: "success", variant: "subtle" },
  warning: { colorScheme: "warning", variant: "subtle" },
} satisfies Record<string, styles.BadgeVariants>;

type BadgeProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  {
    appearance?: keyof typeof appearances;
    children: ReactNode;
  } & styles.BadgeVariants
>;

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      appearance = "neutral",
      children,
      className,
      colorScheme,
      variant,
      ...props
    },
    ref,
  ) => {
    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;
    return (
      <Flex
        {...styles.badge(
          { colorScheme: finalColorScheme, variant: finalVariant },
          className,
        )}
        ref={ref}
        {...props}
      >
        <Text as="span" fontSize="inherit">
          {children}
        </Text>
      </Flex>
    );
  },
);

Badge.displayName = "Badge";
