import { Grid } from "@optiaxiom/react";

import styles from "./BoxIcon.module.css";
import { IconBox } from "./IconBox";

export const BoxIcon = () => (
  <Grid
    className={styles.icon}
    style={{
      transform: "rotate3d(1, 1, 0, 45deg)",
      transformStyle: "preserve-3d",
    }}
  >
    <IconBox
      bg="bg.default"
      className={styles.layer}
      h="lg"
      transition="all"
      w="56"
    />
    <IconBox
      bg="bg.warning.subtle"
      className={styles.layer}
      h="lg"
      transition="all"
      w="56"
    />
    <IconBox
      bg="bg.default"
      className={styles.layer}
      h="lg"
      transition="all"
      w="56"
    />
  </Grid>
);
