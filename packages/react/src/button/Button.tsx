import { Slot, Slottable } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import * as styles from "./Button.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  default: { colorScheme: "secondary", variant: "outline" },
  primary: { colorScheme: "primary", variant: "solid" },
  secondary: { colorScheme: "secondary", variant: "ghost" },
} satisfies Record<string, styles.ButtonVariants>;

type ButtonProps = ExtendProps<
  ComponentPropsWithRef<"button">,
  ComponentPropsWithRef<typeof Box>,
  {
    appearance?: keyof typeof appearances;
    children?: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: "end" | "start";
    isLoading?: boolean;
  } & Omit<styles.ButtonVariants, "icon">
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

    const presetProps = appearances[appearance];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;
    const isDisabled = Boolean(disabled || isLoading);
    const isIcon = Boolean(!children && icon);

    return (
      <Box
        asChild
        data-disabled={isDisabled}
        {...styles.button(
          {
            colorScheme: finalColorScheme,
            icon: isIcon,
            size,
            variant: finalVariant,
          },
          className,
        )}
        {...props}
      >
        <Comp disabled={isDisabled} ref={ref}>
          {isIcon ? (
            icon
          ) : (
            <>
              {icon && iconPosition === "start" && (
                <Box {...styles.section()}>{icon}</Box>
              )}
              <Slottable>{children}</Slottable>
              {icon && iconPosition === "end" && (
                <Box {...styles.section()}>{icon}</Box>
              )}
            </>
          )}
        </Comp>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
