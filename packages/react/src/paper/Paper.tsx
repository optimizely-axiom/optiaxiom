import { type ComponentPropsWithRef, forwardRef } from "react";

import type { Sprinkles } from "../sprinkles";
import type { ExtendProps } from "../utils";

import { Box } from "../box";

type PaperProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    elevation?: Sprinkles["shadow"];
  }
>;

export const Paper = forwardRef<HTMLParagraphElement, PaperProps>(
  ({ elevation = "sm", ...props }, ref) => {
    return (
      <Box bg="surface" ref={ref} rounded="sm" shadow={elevation} {...props} />
    );
  },
);

Paper.displayName = "@optiaxiom/react/Paper";
