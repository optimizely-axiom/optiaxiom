import { Group } from "@optiaxiom/react";

import styles from "./ColorsIcon.module.css";
import { IconBox } from "./IconBox";

export const ColorsIcon = () => (
  <Group w="xl">
    <IconBox bg="bg.information" className={styles.swatch} flex="1" h="lg" />
  </Group>
);
