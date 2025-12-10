import type { ComponentPropsWithRef } from "react";

import { Box, type BoxProps } from "@optiaxiom/react";

type TheadProps = BoxProps & ComponentPropsWithRef<"thead">;

export const Thead = ({ children, ...props }: TheadProps) => (
  <Box asChild {...props}>
    <thead>{children}</thead>
  </Box>
);
