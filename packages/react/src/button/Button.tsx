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

import { Stack } from "../stack";
import { Text } from "../text";

type ButtonProps = ExtendProps<
  ComponentPropsWithRef<"button">,
  ComponentPropsWithRef<typeof Stack>,
  {
    asChild?: boolean;
    children: ReactNode;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
  }
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, children, leftSection, rightSection, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    children =
      asChild && isValidElement(children) ? (
        cloneElement(
          children,
          undefined,
          <Text fontWeight="600">{children.props.children}</Text>,
        )
      ) : (
        <Text fontWeight="600">{children}</Text>
      );

    const innerRef = useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(ref, innerRef);

    return (
      <Stack
        asChild
        bg="white"
        color="blue.500"
        cursor="pointer"
        display="inline-flex"
        flexDirection="horizontal"
        gap="xs"
        overflow="hidden"
        rounded="sm"
        sx={{
          ":hover": {
            bg: "blue.50",
          },
        }}
        transition="colors"
        {...props}
      >
        <Comp ref={composedRef}>
          {leftSection}
          <Slottable>{children}</Slottable>
          {rightSection}
        </Comp>
      </Stack>
    );
  },
);

Button.displayName = "@optiaxiom/react/Button";
