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

import { Ripple } from "../ripple";
import { Stack } from "../stack";
import { Text } from "../text";
import { type Recipe, recipe } from "./Button.recipe";

type ButtonProps = ExtendProps<
  ComponentPropsWithRef<"button">,
  ComponentPropsWithRef<typeof Stack>,
  {
    asChild?: boolean;
    children: ReactNode;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
  } & Recipe
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild, children, leftSection, rightSection, size, variant, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    children =
      asChild && isValidElement(children) ? (
        cloneElement(
          children,
          undefined,
          <Text fontSize="inherit" fontWeight="600">
            {children.props.children}
          </Text>,
        )
      ) : (
        <Text fontSize="inherit" fontWeight="600">
          {children}
        </Text>
      );

    const innerRef = useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(ref, innerRef);

    return (
      <Stack
        asChild
        className={recipe({ size, variant })}
        cursor="pointer"
        display="inline-flex"
        flexDirection="horizontal"
        gap="xs"
        overflow="hidden"
        position="relative"
        rounded="sm"
        transition="colors"
        {...props}
      >
        <Comp ref={composedRef}>
          {leftSection}
          <Slottable>{children}</Slottable>
          {rightSection}
          <Ripple targetRef={innerRef} />
        </Comp>
      </Stack>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
