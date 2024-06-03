import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
// import { Text } from "../text";
import { type ExtendProps } from "../utils";
import { type Recipe, recipe } from "./Input.recipe";

type InputProps = ExtendProps<
  ComponentPropsWithRef<"input">,
  ComponentPropsWithRef<typeof Box>,
  { isDisabled?: boolean; isInvalid?: boolean } & Recipe
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isDisabled, isInvalid, placeholder, type, ...props }, ref) => {
    return (
      <Box
        aria-invalid={isInvalid}
        asChild
        data-disabled={isDisabled}
        display="flex"
        flexDirection="column"
        fontFamily="sans"
        fontSize="md"
        maxW="sm"
        ref={ref}
        {...recipe(props)}
      >
        <input placeholder={placeholder} type={type} />
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
