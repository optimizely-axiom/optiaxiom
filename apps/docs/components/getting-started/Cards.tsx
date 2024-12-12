import { Box, Flex, Grid, Heading, Text } from "@optiaxiom/react";
import { IconBox, IconPalette } from "@tabler/icons-react";
import Link from "next/link";

import styles from "./Cards.module.css";

export function Cards() {
  return (
    <Grid gap="32" gridTemplateColumns={["1", "2"]} mt="16" mx="-16">
      <Flex
        alignItems="start"
        asChild
        className={styles.card}
        flexDirection="row"
        gap="24"
        p="16"
        pb="24"
        rounded="md"
      >
        <Link href="/styled-system">
          <Box
            asChild
            bg="bg.information.subtle"
            border="4"
            borderColor="bg.default"
            className={styles.icon}
            color="fg.information.strong"
            p="12"
            rounded="full"
            size="2xl"
          >
            <IconPalette />
          </Box>
          <Box flex="1">
            <Heading fontSize="lg" fontWeight="600" level="4">
              Styled System
            </Heading>
            <Text mt="4">
              Learn about our styling solution and how to consume our design
              tokens.
            </Text>
          </Box>
        </Link>
      </Flex>

      <Flex
        alignItems="start"
        asChild
        className={styles.card}
        flexDirection="row"
        gap="24"
        p="16"
        pb="24"
        rounded="md"
      >
        <Link href="/components">
          <Box
            asChild
            bg="bg.success.subtle"
            border="4"
            borderColor="bg.default"
            className={styles.icon}
            color="fg.success.strong"
            p="12"
            rounded="full"
            size="2xl"
          >
            <IconBox />
          </Box>
          <Box flex="1">
            <Heading fontSize="lg" fontWeight="600" level="4">
              Components
            </Heading>
            <Text mt="4">
              Discover all the components available in our library and how to
              use them.
            </Text>
          </Box>
        </Link>
      </Flex>
    </Grid>
  );
}
