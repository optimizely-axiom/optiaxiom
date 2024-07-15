import { forwardRef } from "react";

import type { Sprinkles } from "../sprinkles";

import { Box, type BoxProps } from "../box";

type PaperProps = BoxProps<
  "div",
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
