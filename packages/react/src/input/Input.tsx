import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Text } from "../text";
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
    return (
      <Box
        display="flex"
        flexDirection="column"
        fontFamily="sans"
        fontSize="md"
        maxW="sm"
        ref={ref}
        {...recipe(props)}
      >
        {label && (
          <Text as="label">
            {label}{" "}
            {required && (
              <Text as="span" color="red.600">
                *
              </Text>
            )}
          </Text>
        )}
        <input
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          required={required}
          type={variant}
        />
        {note && (
          <Text as="p" fontSize="sm">
            {note}
          </Text>
        )}
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
