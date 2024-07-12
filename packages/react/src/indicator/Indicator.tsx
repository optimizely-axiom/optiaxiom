import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import * as styles from "./Indicator.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "accent" },
  info: { colorScheme: "info", variant: "accent" },
  neutral: { colorScheme: "neutral", variant: "accent" },
  primary: { colorScheme: "primary", variant: "subtle" },
  success: { colorScheme: "success", variant: "subtle" },
  warning: { colorScheme: "warning", variant: "subtle" },
} satisfies Record<string, styles.IndicatorVariants>;

type IndicatorProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  {
    appearance?: keyof typeof appearances;
    children: ReactNode;
    content: string;
  } & styles.IndicatorVariants
>;

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  (
    {
      appearance = "neutral",
      children,
      className,
      colorScheme,
      content,
      position = "top-right",
      variant,
      ...props
    },
    ref,
  ) => {
    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;
    return (
      <Flex {...styles.indicatorContainer()} ref={ref} {...props}>
        <Flex
          {...styles.indicator(
            { colorScheme: finalColorScheme, position, variant: finalVariant },
            className,
          )}
        >
          {content}
        </Flex>
        {children}
      </Flex>
    );
  },
);

Indicator.displayName = "Indicator";
