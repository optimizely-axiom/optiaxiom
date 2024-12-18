import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Td = ({
  children,
  valign = "top",
  ...props
}: ComponentPropsWithRef<typeof Box> &
  Pick<ComponentPropsWithoutRef<"td">, "valign">) => (
  <Box asChild p="12" {...props}>
    <td valign={valign}>{children}</td>
  </Box>
);
