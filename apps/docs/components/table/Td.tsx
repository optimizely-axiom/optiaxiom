import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

import { Box, type BoxProps } from "@optiaxiom/react";

type TdProps = BoxProps &
  ComponentPropsWithRef<"td"> &
  Pick<ComponentPropsWithoutRef<"td">, "valign">;

export const Td = ({ children, valign = "top", ...props }: TdProps) => (
  <Box asChild p="12" {...props}>
    <td valign={valign}>{children}</td>
  </Box>
);
