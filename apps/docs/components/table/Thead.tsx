import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Thead = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild {...props}>
    <thead>{children}</thead>
  </Box>
);
