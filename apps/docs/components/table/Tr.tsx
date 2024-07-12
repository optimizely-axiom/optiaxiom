import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Tr = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild borderB="1" borderColor="border.tertiary" {...props}>
    <tr>{children}</tr>
  </Box>
);
