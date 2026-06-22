import { Group, Text } from "@optiaxiom/react";

import styles from "./FontsIcon.module.css";

export const FontsIcon = () => (
  <Group
    flexDirection="row"
    fontFamily="heading"
    style={{ alignItems: "baseline" }}
  >
    <Text
      className={styles.letter}
      style={{
        fontSize: "40px",
        lineHeight: 1,
      }}
    >
      A
    </Text>
    <Text
      className={styles.letter}
      style={{
        fontSize: "36px",
        lineHeight: 1,
      }}
    >
      a
    </Text>
  </Group>
);
