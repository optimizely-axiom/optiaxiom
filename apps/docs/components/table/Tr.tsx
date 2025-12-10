import type { ComponentPropsWithRef } from "react";

import { Box, type BoxProps } from "@optiaxiom/react";

type TrProps = BoxProps & ComponentPropsWithRef<"tr">;

export const Tr = ({ children, ...props }: TrProps) => (
  <Box asChild borderColor="border.tertiary" borderT="1" {...props}>
    <tr>{children}</tr>
  </Box>
);
