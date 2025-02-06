import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Tr = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild borderColor="border.tertiary" borderT="1" {...props}>
    <tr>{children}</tr>
  </Box>
);
