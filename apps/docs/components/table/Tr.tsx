import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

export const Tr = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box
    asChild
    borderColor="border.tertiary"
    style={{ borderBottomWidth: "1px" }}
    {...props}
  >
    <tr>{children}</tr>
  </Box>
);
