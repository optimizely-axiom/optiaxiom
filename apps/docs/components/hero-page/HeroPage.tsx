import { Box, Flex, Heading, Text } from "@optiaxiom/react";
import Link from "next/link";

import styles from "./HeroPage.module.css";

export function HeroPage() {
  return (
    <Flex alignItems={["start", "center"]} h="full" justifyContent="center">
      <Heading className={styles.heading} level="1">
        <Box asChild className={styles.brand}>
          <span>Axiom</span>
        </Box>{" "}
        Design System
      </Heading>

      <Text fontSize="2xl" mb="24">
        Axiom is the technical implementation of the Optimizely Design System.
      </Text>

      <Box
        asChild
        color="fg.accent.strong"
        fontSize="2xl"
        fontWeight="600"
        px="24"
        py="12"
        rounded="md"
      >
        <Link className={styles.button} href="/guides">
          Get started
        </Link>
      </Box>
    </Flex>
  );
}
