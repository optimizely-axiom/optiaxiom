import { Box, Flex, Heading, Text } from "@optiaxiom/react";
import Link from "next/link";

import styles from "./HeroPage.module.css";

export function HeroPage() {
  return (
    <Flex
      alignItems={["start", "center"]}
      className={styles.root}
      h="full"
      justifyContent="center"
    >
      <Heading className={`${styles.heading} ${styles.fade}`} level="1">
        <Box asChild className={styles.brand}>
          <span>Axiom</span>
        </Box>{" "}
        Design System
      </Heading>

      <Text className={styles.fade} mb="24">
        Axiom is a modular design system for efficiently designing and building
        UI at Optimizely.
      </Text>

      <Box className={styles.fade}>
        <Box
          asChild
          color="fg.accent.strong"
          fontWeight="600"
          px="24"
          py="12"
          rounded="md"
        >
          <Link className={styles.button} href="/guides">
            Get started
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}
