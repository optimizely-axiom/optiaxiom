import type { ComponentType, ReactNode } from "react";

import { Box, Stack } from "@optiaxiom/react";

import styles from "./Demo.module.css";
import { DemoIframe } from "./DemoIframe";

export function Demo({
  children,
  component: Component,
  iframe,
}: {
  children: ReactNode;
  component: ComponentType;
  iframe?: string;
}) {
  return (
    <Stack marginTop="xl">
      <Box
        className={[styles.preview, iframe && styles.resize].join(" ")}
        padding="xl"
      >
        {iframe ? <DemoIframe src={iframe} /> : <Component />}
      </Box>
      <Box className={styles.editor}>{children}</Box>
    </Stack>
  );
}
