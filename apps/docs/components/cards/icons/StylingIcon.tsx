import { Group } from "@optiaxiom/react";

import { IconBox } from "./IconBox";
import styles from "./StylingIcon.module.css";

export const StylingIcon = () => (
  <Group className={styles.icon} flexDirection="column" gap="4" w="xl">
    <IconBox bg="bg.error.light" className={styles.layer} transition="all" />
    <IconBox bg="bg.success.light" className={styles.layer} transition="all" />
    <IconBox
      bg="bg.information.light"
      className={styles.layer}
      transition="all"
    />
  </Group>
);
