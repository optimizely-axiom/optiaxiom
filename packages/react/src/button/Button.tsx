import { Slot, Slottable } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  type ComponentPropsWithRef,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import type { ExtendProps } from "../utils";

import { Box } from "../box";
import { Text } from "../text";
import { type ButtonVariants, button } from "./Button.css";

const presets = {
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  default: { colorScheme: "secondary", variant: "outline" },
  primary: { colorScheme: "primary", variant: "solid" },
  secondary: { colorScheme: "secondary", variant: "ghost" },
} satisfies Record<string, ButtonVariants>;

type ButtonProps = ExtendProps<
  ComponentPropsWithRef<"button">,
  ComponentPropsWithRef<typeof Box>,
  {
    children?: ReactNode;
    disabled?: boolean;
    isLoading?: boolean;
    leftSection?: ReactNode;
    preset?: keyof typeof presets;
    rightSection?: ReactNode;
  } & ButtonVariants
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      children,
      className,
      colorScheme,
      disabled,
      isLoading,
      leftSection,
      onClick,
      preset = "default",
      rightSection,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    children =
      asChild && isValidElement(children) ? (
        cloneElement(
          children,
          undefined,
          <Text as="span" fontSize="inherit">
            {children.props.children}
          </Text>,
        )
      ) : (
        <Text as="span" fontSize="inherit">
          {children}
        </Text>
      );

    const presetProps = presets[preset];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;

    return (
      <Box
        asChild
        className={clsx(
          button({
            colorScheme: finalColorScheme,
            size,
            variant: finalVariant,
          }),
          className,
        )}
        data-disabled={disabled || isLoading}
        onClick={disabled || isLoading ? undefined : onClick}
        {...props}
      >
        <Comp ref={ref}>
          <>
            {leftSection}
            <Slottable>{children}</Slottable>
            {rightSection}
          </>
        </Comp>
      </Box>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
