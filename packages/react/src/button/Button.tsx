import { Slot, Slottable } from "@radix-ui/react-slot";
import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Button.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  default: { colorScheme: "secondary", variant: "outline" },
  primary: { colorScheme: "primary", variant: "solid" },
  secondary: { colorScheme: "secondary", variant: "subtle" },
} satisfies Record<string, styles.ButtonVariants>;

type ButtonProps = BoxProps<
  "button",
  {
    appearance?: keyof typeof appearances;
    children?: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: "end" | "start";
    isLoading?: boolean;
  } & Omit<styles.ButtonVariants, "iconOnly">
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;
    const isDisabled = Boolean(disabled || isLoading);
    const isIconOnly = Boolean(!children && icon);

    return (
      <Box
        asChild
        data-disabled={isDisabled}
        {...styles.button(
          {
            colorScheme: finalColorScheme,
            disabled: isDisabled,
            iconOnly: isIconOnly,
            size,
            variant: finalVariant,
          },
          className,
        )}
        {...sprinkleProps}
      >
        <Comp disabled={isDisabled} ref={ref} {...restProps}>
          {!isIconOnly && (
            <Box
              asChild
              {...styles.icon({
                position: "start",
                size: icon && iconPosition === "start" ? size : undefined,
              })}
            >
              {icon && iconPosition === "start" ? icon : <div />}
            </Box>
          )}
          <Slottable>
            {isIconOnly ? (
              <Box asChild {...styles.icon({ size })}>
                {icon}
              </Box>
            ) : (
              children
            )}
          </Slottable>
          {!isIconOnly && (
            <Box
              asChild
              {...styles.icon({
                position: "end",
                size: icon && iconPosition === "end" ? size : undefined,
              })}
            >
              {icon && iconPosition === "end" ? icon : <div />}
            </Box>
          )}
        </Comp>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
