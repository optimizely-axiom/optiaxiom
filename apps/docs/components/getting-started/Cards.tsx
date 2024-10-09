import type { ComponentPropsWithRef } from "react";

import { Box, Flex, Grid, Heading, Text } from "@optiaxiom/react";
import { IconBox, IconPalette } from "@tabler/icons-react";
import Link from "next/link";

import styles from "./Cards.module.css";

export function Cards(props: ComponentPropsWithRef<typeof Grid>) {
  return (
    <Grid gap="xl" gridTemplateColumns={["1", "2"]} mx="-md" {...props}>
      <Flex
        alignItems="start"
        asChild
        className={styles.card}
        flexDirection="row"
        gap="lg"
        p="md"
        pb="lg"
        rounded="md"
      >
        <Link href="/styled-system">
          <Box
            asChild
            bg="bg.discovery"
            border="4"
            borderColor="bg.default"
            className={styles.icon}
            color="fg.accent.purple"
            p="sm"
            rounded="full"
            size="56"
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
        gap="lg"
        p="md"
        pb="lg"
        rounded="md"
      >
        <Link href="/components">
          <Box
            asChild
            bg="bg.success"
            border="4"
            borderColor="bg.default"
            className={styles.icon}
            color="fg.success"
            p="sm"
            rounded="full"
            size="56"
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
