import {
  IconCircleCheck,
  IconCircleXmark,
  IconTriangleExclamation,
} from "@optiaxiom/icons";
import { Box } from "@optiaxiom/react";

import styles from "./IconsIcon.module.css";

export const IconsIcon = () => (
  <Box display="grid">
    <Box asChild className={styles.layer} color="fg.error" transition="all">
      <IconCircleXmark filled />
    </Box>
    <Box asChild className={styles.layer} color="fg.success" transition="all">
      <IconCircleCheck filled />
    </Box>
    <Box asChild className={styles.layer} color="fg.warning" transition="all">
      <IconTriangleExclamation filled />
    </Box>
  </Box>
);
