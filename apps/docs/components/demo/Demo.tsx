import type { ComponentType, ReactNode } from "react";

import { Box } from "@optimizely-axiom/react";

import styles from "./Demo.module.css";

export function Demo({
  children,
  component: Component,
}: {
  children: ReactNode;
  component: ComponentType;
}) {
  return (
    <Box borderRadius="xl" marginTop="xl">
      <Box className={styles.preview} padding="md">
        <div className={styles.reset}>
          <Component />
        </div>
      </Box>
      <Box className={styles.editor}>{children}</Box>
    </Box>
  );
}
