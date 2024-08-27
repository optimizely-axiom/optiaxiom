import { Slot, Slottable } from "@radix-ui/react-slot";
import {
  type ElementType,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { type ExtendProps, fallbackSpan } from "../utils";
import * as styles from "./Button.css";

const appearances = {
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  default: { colorScheme: "neutral", variant: "outline" },
  primary: { colorScheme: "primary", variant: "solid" },
  secondary: { colorScheme: "neutral", variant: "subtle" },
} satisfies Record<string, styles.ButtonVariants>;

export type ButtonProps<
  T extends ElementType = "button",
  P = unknown,
> = BoxProps<
  T,
  ExtendProps<
    {
      appearance?: keyof typeof appearances;
      children?: ReactNode;
      disabled?: boolean;
      endDecorator?: ReactNode;
      icon?: ReactNode;
      iconPosition?: "end" | "start";
      loading?: boolean;
      startDecorator?: ReactNode;
    } & Omit<styles.ButtonVariants, "iconOnly">,
    P
  >
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      appearance = "default",
      asChild,
      children,
      className,
      colorScheme: colorSchemeProp,
      disabled,
      endDecorator,
      icon,
      iconPosition = "start",
      loading,
      size = "md",
      startDecorator,
      variant: variantProp,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const presetProps = appearances[appearance];
    const colorScheme = colorSchemeProp ?? presetProps.colorScheme;
    const variant = variantProp ?? presetProps.variant;
    const isDisabled = Boolean(disabled || loading);
    let isIconOnly = Boolean(!children && icon);

    if (asChild) {
      const newElement = isValidElement(children) ? children : null;
      isIconOnly = Boolean(!newElement?.props.children && icon);
      children = newElement
        ? cloneElement(
            newElement,
            undefined,
            isIconOnly ? (
              <Box asChild {...styles.icon()}>
                {icon}
              </Box>
            ) : (
              <Flex asChild {...styles.label()}>
                {fallbackSpan(newElement.props.children)}
              </Flex>
            ),
          )
        : children;
    } else {
      children = isIconOnly ? (
        <Box asChild {...styles.icon()}>
          {icon}
        </Box>
      ) : (
        <Flex asChild {...styles.label()}>
          {fallbackSpan(children)}
        </Flex>
      );
    }
    if (icon && !isIconOnly) {
      if (iconPosition === "start") {
        startDecorator = (
          <Box asChild {...styles.icon()}>
            {icon}
          </Box>
        );
      } else if (iconPosition === "end") {
        endDecorator = (
          <Box asChild {...styles.icon()}>
            {icon}
          </Box>
        );
      }
    }

    return (
      <Box
        asChild
        data-disabled={isDisabled ? "" : undefined}
        {...styles.button(
          {
            colorScheme,
            iconOnly: isIconOnly,
            size,
            variant,
          },
          className,
        )}
        {...sprinkleProps}
      >
        <Comp disabled={isDisabled} ref={ref} {...restProps}>
          {startDecorator}

          <Slottable>{children}</Slottable>

          {endDecorator}
        </Comp>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
