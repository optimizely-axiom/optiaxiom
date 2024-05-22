import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
// import { Text } from "../text";
import { type ExtendProps } from "../utils";
import { type Recipe, recipe } from "./Input.recipe";

type InputProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  {
    id: string;
    label?: string;
    note?: string;
  } & Recipe
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      type,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        asChild
        display="flex"
        flexDirection="column"
        fontFamily="sans"
        fontSize="md"
        maxW="sm"
        ref={ref}
        {...recipe(props)}
      >
        {/* {label && (
          <Text as="label">
            {label}{" "}
            {required && (
              <Text as="span" color="red.600">
                *
              </Text>
            )}
          </Text>
        )} */}
        <input
          placeholder={placeholder}
          type={type}
        />
        {/* {note && (
          <Text as="p" fontSize="sm">
            {note}
          </Text>
        )} */}
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
