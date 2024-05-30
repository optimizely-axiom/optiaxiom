import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Slot, Slottable } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithRef,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
  useRef,
} from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";
import { Text } from "../text";
import { type Recipe, recipe } from "./Button.recipe";

const presets = {
  basic: { colorScheme: "secondary", variant: "solid" },
  "basic-link": { colorScheme: "secondary", variant: "link" },
  danger: { colorScheme: "danger", variant: "solid" },
  "danger-outline": { colorScheme: "danger", variant: "outline" },
  plain: { colorScheme: "secondary", variant: "ghost" },
  primary: { colorScheme: "primary", variant: "solid" },
} satisfies Record<string, Recipe>;

type ButtonProps = ExtendProps<
  ComponentPropsWithRef<"button">,
  ComponentPropsWithRef<typeof Flex>,
  {
    asChild?: boolean;
    children?: ReactNode;
    isLoading?: boolean;
    leftSection?: ReactNode;
    preset?: keyof typeof presets;
    rightSection?: ReactNode;
  } & Recipe
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      children,
      colorScheme,
      disabled,
      isLoading,
      leftSection,
      onClick,
      preset = "basic",
      rightSection,
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
          <Text fontSize="inherit">{children.props.children}</Text>,
        )
      ) : (
        <Text fontSize="inherit">{children}</Text>
      );

    const innerRef = useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(ref, innerRef);

    const presetProps = presets[preset];
    const finalColorScheme = colorScheme ?? presetProps.colorScheme;
    const finalVariant = variant ?? presetProps.variant;

    return (
      <Flex
        asChild
        cursor="pointer"
        data-disabled={disabled || isLoading}
        display="inline-flex"
        flexDirection="row"
        gap="xs"
        onClick={disabled || isLoading ? undefined : onClick}
        overflow="hidden"
        position="relative"
        rounded="sm"
        transition="colors"
        {...recipe({
          ...props,
          colorScheme: finalColorScheme,
          variant: finalVariant,
        })}
      >
        <Comp ref={composedRef}>
          <>
            {leftSection}
            <Slottable>{children}</Slottable>
            {rightSection}
          </>
        </Comp>
      </Flex>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
