import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Td = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild paddingX="1.5" paddingY="1" {...props}>
    <td valign="top">{children}</td>
  </Box>
);
