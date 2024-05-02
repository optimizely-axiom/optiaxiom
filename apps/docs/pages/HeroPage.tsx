import { Heading, Stack, Text } from "@optiaxiom/react";
import Link from "next/link";

import styles from "./HeroPage.module.css";

export function HeroPage() {
  return (
    <Stack
      alignItems="center"
      className={styles.wrapper}
      gap="xl"
      justifyContent="center"
    >
      <Heading className={styles.header} level={1}>
        <span className={styles.highlight}>Axiom</span> Design System
      </Heading>

      <Text className={styles.body}>
        Axiom is the technical implementation of the Optimizely Design System.
      </Text>

      <Link href="/getting-started">
        <button className={styles.button}>Get started</button>
      </Link>
    </Stack>
  );
}
