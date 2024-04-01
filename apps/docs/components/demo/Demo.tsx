import type { ComponentType, ReactNode } from "react";

import { Box, Stack } from "@optimizely-axiom/react";

import styles from "./Demo.module.css";

export function Demo({
  children,
  component: Component,
}: {
  children: ReactNode;
  component: ComponentType;
}) {
  return (
    <Stack marginTop="xl">
      <Box className={styles.preview} padding="md">
        <Component />
      </Box>
      <Box className={styles.editor}>{children}</Box>
    </Stack>
  );
}
