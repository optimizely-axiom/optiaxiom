import type { ComponentPropsWithRef } from "react";

import { Box, Text } from "@optiaxiom/react";

import styles from "./Th.module.css";

export const Th = ({
  asChild,
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild bg="bg.neutral" className={styles.th} {...props}>
    <th>
      <Text asChild={asChild} fontWeight="600" p="12">
        {children ?? <>&nbsp;</>}
      </Text>
    </th>
  </Box>
);
