import * as RadixSeparator from "@radix-ui/react-separator";
import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { type ExtendProps } from "../utils";
import { type Recipe, recipe } from "./Separator.recipe";

type SeparatorProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixSeparator.Root>,
  ComponentPropsWithRef<typeof Box>,
  Recipe
>;

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : RadixSeparator.Root;

    return (
      <Box asChild ref={ref} {...props} {...recipe(props)}>
        <Comp />
      </Box>
    );
  },
);

Separator.displayName = "@optiaxiom/react/Separator";
