import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Td = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild px="1.5" py="1" {...props}>
    <td valign="top">{children}</td>
  </Box>
);
