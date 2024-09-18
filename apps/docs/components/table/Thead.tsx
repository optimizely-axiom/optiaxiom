import type { ComponentPropsWithRef } from "react";

import { Box } from "@optiaxiom/react";

import styles from "./Thead.module.css";

export const Thead = ({
  children,
  ...props
}: ComponentPropsWithRef<typeof Box>) => (
  <Box asChild className={styles.thead} {...props}>
    <thead>{children}</thead>
  </Box>
);
