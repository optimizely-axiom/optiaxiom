import type { ReactNode } from "react";

import { Box, Flex, Heading, Link, Text } from "@optiaxiom/react";
import NextLink from "next/link";

import styles from "./CardsItem.module.css";

export function CardsItem({
  children,
  href,
  icon,
  title,
}: {
  children?: ReactNode;
  href: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <Flex
      alignItems="start"
      className={styles.card}
      color="fg.default"
      flexDirection="row"
      gap="16"
      p="12"
      rounded="md"
    >
      <Box
        bg="bg.default.hovered"
        display="grid"
        placeItems="center"
        rounded="md"
        size="3xl"
      >
        {icon}
      </Box>

      <Box flex="1">
        <Heading fontSize="xl" fontWeight="600" level="4">
          <Link asChild color="fg.default" overlay>
            <NextLink href={href}>{title}</NextLink>
          </Link>
        </Heading>
        <Text lineClamp="2" mt="4">
          {children}
        </Text>
      </Box>
    </Flex>
  );
}
