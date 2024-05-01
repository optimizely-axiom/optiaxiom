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
        borderBottomWidth="1"
        fontWeight="600"
        px="12"
        py="2"
      >
        {children ?? <>&nbsp;</>}
      </Text>
    </th>
  </Box>
);
