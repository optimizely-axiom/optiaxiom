import type { ComponentType, ReactNode } from "react";

import { Box, Flex } from "@optiaxiom/react";

import styles from "./Demo.module.css";
import { DemoIframe } from "./DemoIframe";

export function Demo({
  children,
  component: Component,
  height,
  iframe,
}: {
  children: ReactNode;
  component: ComponentType;
  height?: string;
  iframe?: string;
}) {
  return (
    <Flex mt="xl">
      <Box border="1" className={iframe && styles.resize} p="xl" rounded="xl">
        {iframe ? <DemoIframe height={height} src={iframe} /> : <Component />}
      </Box>
      <Box className={styles.editor}>{children}</Box>
    </Flex>
  );
}
