import { Box, Flex, Heading, Text } from "@optiaxiom/react";
import Link from "next/link";

import styles from "./HeroPage.module.css";

export function HeroPage() {
  return (
    <Flex alignItems={["start", "center"]} h="full" justifyContent="center">
      <Heading
        fontSize={["5xl", "6xl", "7xl"]}
        fontWeight="800"
        level="1"
        tracking="tight"
      >
        <Box asChild color="fg.information.light">
          <span>Axiom</span>
        </Box>{" "}
        Design System
      </Heading>

      <Text fontSize="2xl" mb="24">
        Axiom is the technical implementation of the Optimizely Design System.
      </Text>

      <Link href="/getting-started">
        <Box
          asChild
          bg="bg.information.light"
          color="fg.default"
          fontSize="2xl"
          fontWeight="600"
          px="24"
          py="12"
          rounded="md"
        >
          <button className={styles.button}>Get started</button>
        </Box>
      </Link>
    </Flex>
  );
}
