import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Box, type Sprinkles } from "../box";

type PaperProps = ExtendProps<
  ComponentPropsWithRef<typeof Box>,
  {
    elevation?: Sprinkles["boxShadow"];
  }
>;

export const Paper = forwardRef<HTMLParagraphElement, PaperProps>(
  ({ elevation = "sm", ...props }, ref) => {
    return (
      <Box
        background="surface"
        borderRadius="sm"
        boxShadow={elevation}
        ref={ref}
        {...props}
      />
    );
  },
);

Paper.displayName = "@optiaxiom/react/Paper";
