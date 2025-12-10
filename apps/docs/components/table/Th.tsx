import type { ComponentPropsWithRef } from "react";

import { Box, type BoxProps, Text } from "@optiaxiom/react";

type ThProps = BoxProps & ComponentPropsWithRef<"th">;

export const Th = ({ asChild, children, ...props }: ThProps) => (
  <Box asChild bg="bg.secondary" textAlign="start" {...props}>
    <th>
      <Text asChild={asChild} fontWeight="600" p="12">
        {children ?? <>&nbsp;</>}
      </Text>
    </th>
  </Box>
);
