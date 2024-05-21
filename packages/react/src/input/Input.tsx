// import { Slot } from "@radix-ui/react-slot";
import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Text } from "../text";
import { type ExtendProps } from "../utils";
import { type Recipe, recipe } from "./Input.recipe";

type InputProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  {
    as?: "input";
    id: string;
    label?: string;
    note?: string;
  } & Recipe
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      as = "input",
      asChild,
      children,
      disabled = false,
      id,
      label,
      note,
      placeholder,
      required,
      type,
      variant,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as;

    return (
      <Box display="flex" flexDirection="column" maxW="sm">
        {label && (
          <Text as="label" fontSize="sm" h="32" pt="lg" px="sm">
            {label}{" "}
            {required && (
              <Text as="span" color="red.600">
                *
              </Text>
            )}
          </Text>
        )}
        <Box
          asChild
          fontFamily="sans"
          fontSize="md"
          ref={ref}
          {...recipe(props)}
        >
          <Comp
            disabled={disabled}
            id={id}
            placeholder={placeholder}
            required={required}
            type={variant}
          >
            {children}
          </Comp>
        </Box>
        {note && (
          <Text as="p" fontSize="sm" pt="0" px="sm">
            {note}
          </Text>
        )}
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
