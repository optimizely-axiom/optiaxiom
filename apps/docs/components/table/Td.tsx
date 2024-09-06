import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Td = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild p="12" {...props}>
    <td valign="top">{children}</td>
  </Box>
);
