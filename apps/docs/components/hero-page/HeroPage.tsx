import { Box, Heading, Stack, Text } from "@optiaxiom/react";
import Link from "next/link";

import styles from "./HeroPage.module.css";

export function HeroPage() {
  return (
    <Stack alignItems={["start", "center"]} h="full" justifyContent="center">
      <Heading
        fontSize={["4xl", "5xl", "6xl"]}
        fontWeight="800"
        level="1"
        tracking="tight"
      >
        <Box asChild color="aqua.500">
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
          bg="aqua.200"
          fontSize="2xl"
          fontWeight="600"
          px="32"
          py="16"
          rounded="md"
        >
          <button className={styles.button}>Get started</button>
        </Box>
      </Link>
    </Stack>
  );
}
