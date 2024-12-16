import { Flex } from "@optiaxiom/react";

import { IconBox } from "./IconBox";
import styles from "./StyledSystemIcon.module.css";

export const StyledSystemIcon = () => (
  <Flex className={styles.icon} gap="4" w="xl">
    <IconBox bg="bg.error.light" className={styles.layer} transition="all" />
    <IconBox bg="bg.success.light" className={styles.layer} transition="all" />
    <IconBox
      bg="bg.information.light"
      className={styles.layer}
      transition="all"
    />
  </Flex>
);
