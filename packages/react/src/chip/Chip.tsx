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
  secondary: { colorScheme: "secondary", variant: "ghost" },
} satisfies Record<string, styles.ChipVariants>;

type ChipProps = ExtendProps<
  ComponentPropsWithRef<"button">,
  ComponentPropsWithRef<typeof Box>,
  {
    appearance?: keyof typeof appearances;
    children?: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: "end" | "start";
    isLoading?: boolean;
  } & Omit<styles.ChipVariants, "iconOnly">
>;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      colorScheme,
      disabled,
      icon,
      iconPosition = "start",
      isLoading,
      size = "md",
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;
    const isDisabled = Boolean(disabled || isLoading);
    const isIconOnly = Boolean(!children && icon);

    return (
      <Box
        asChild
        data-disabled={isDisabled}
        {...styles.chip(
          {
            colorScheme: finalColorScheme,
            disabled: isDisabled,
            iconOnly: isIconOnly,
            size,
            variant: finalVariant,
          },
          className,
        )}
        {...props}
      >
        <Comp disabled={isDisabled} ref={ref}>
          {!isIconOnly && (
            <Box
              asChild
              // {...styles.icon({
              //   position: "start",
              //   size: icon && iconPosition === "start" ? size : undefined,
              // })}
            >
              {icon && iconPosition === "start" ? icon : <div />}
            </Box>
          )}
          <Slottable>
            {isIconOnly ? (
              <Box
                asChild
                // {...styles.icon({ size })}
              >
                {icon}
              </Box>
            ) : (
              children
            )}
          </Slottable>
          {!isIconOnly && (
            <Box
              asChild
              // {...styles.icon({
              //   position: "end",
              //   size: icon && iconPosition === "end" ? size : undefined,
              // })}
            >
              {icon && iconPosition === "end" ? icon : <div />}
            </Box>
          )}
        </Comp>
      </Box>
    );
  },
);

Chip.displayName = "@optiaxiom/react/Chip";
