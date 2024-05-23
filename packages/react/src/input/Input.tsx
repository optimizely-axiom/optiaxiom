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
  } & Recipe
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, placeholder, type, ...props }, ref) => {
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
        <input id={id} placeholder={placeholder} type={type} />
      </Box>
    );
  },
);

Input.displayName = "@optiaxiom/react/Input";
