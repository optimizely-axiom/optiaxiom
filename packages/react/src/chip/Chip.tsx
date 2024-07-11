import { Slot, Slottable } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Chip.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  default: { colorScheme: "secondary", variant: "outline" },
  primary: { colorScheme: "primary", variant: "solid" },
} satisfies Record<string, styles.ChipVariants>;

type ChipProps = ExtendProps<
  ComponentPropsWithRef<"span">,
  ComponentPropsWithRef<typeof Box>,
  {
    appearance?: keyof typeof appearances;
    children?: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    isActionable?: boolean;
  } & Omit<styles.ChipVariants, "actionable">
>;

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      colorScheme,
      disabled,
      icon,
      isActionable = false,
      size = "md",
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span";

    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;

    return (
      <Box
        asChild
        {...styles.chip(
          {
            actionable: isActionable,
            colorScheme: finalColorScheme,
            size,
            variant: finalVariant,
          },
          className,
        )}
        {...props}
      >
        <Comp ref={ref}>
          <Slottable>{children}</Slottable>
          {icon && (
            <Box
              asChild
              {...styles.icon({
                size,
              })}
            >
              {icon}
            </Box>
          )}
        </Comp>
      </Box>
    );
  },
);

Chip.displayName = "@optiaxiom/react/Chip";
