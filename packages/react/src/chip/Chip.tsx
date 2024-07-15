import { Slottable } from "@radix-ui/react-slot";
import * as RadixToggle from "@radix-ui/react-toggle";
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
  ComponentPropsWithRef<typeof RadixToggle.Root>,
  ComponentPropsWithRef<typeof Box>,
  {
    appearance?: keyof typeof appearances;
    children?: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    onDelete?: () => void;
  } & styles.ChipVariants
>;

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      appearance = "default",
      children,
      className,
      colorScheme,
      disabled,
      icon,
      size = "md",
      variant,
      ...props
    },
    ref,
  ) => {
    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;

    return (
      <Box
        asChild
        {...styles.chip(
          {
            colorScheme: finalColorScheme,
            size,
            variant: finalVariant,
          },
          className,
        )}
        {...props}
      >
        <RadixToggle.Root data-disabled={disabled}>
          <span ref={ref}>
            {icon && (
              <Box asChild {...styles.icon({})}>
                {icon}
              </Box>
            )}
            <Slottable>{children}</Slottable>
          </span>
        </RadixToggle.Root>
      </Box>
    );
  },
);

Chip.displayName = "@optiaxiom/react/Chip";
