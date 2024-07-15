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
    startDecorator?: ReactNode;
  } & styles.ChipVariants
>;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      appearance = "default",
      children,
      className,
      colorScheme,
      disabled,
      size = "md",
      startDecorator: icon,
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
        <RadixToggle.Root data-disabled={disabled} ref={ref}>
          {icon && (
            <Box asChild {...styles.icon({})}>
              {icon}
            </Box>
          )}
          {children}
        </RadixToggle.Root>
      </Box>
    );
  },
);

Chip.displayName = "@optiaxiom/react/Chip";
