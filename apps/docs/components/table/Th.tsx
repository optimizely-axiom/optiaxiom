import type { ComponentPropsWithRef } from "react";

import { Box, Text } from "@optiaxiom/react";

export const Th = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild paddingX={1.5} paddingY={0.25} {...props}>
    <Text asChild fontWeight={600}>
      <th>{children}</th>
    </Text>
  </Box>
);
