import type { ComponentPropsWithRef } from "react";

import { Box, Text } from "@optiaxiom/react";

export const Th = ({
  asChild,
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild {...props}>
    <th>
      <Text
        asChild={asChild}
        fontWeight="600"
        px="12"
        py="2"
        style={{ borderBottomWidth: "1px" }}
      >
        {children ?? <>&nbsp;</>}
      </Text>
    </th>
  </Box>
);
