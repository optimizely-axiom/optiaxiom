import type { ReactNode } from "react";

import { Box, Flex, Heading, Text } from "@optiaxiom/react";
import Link from "next/link";

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
      asChild
      className={styles.card}
      color="fg.default"
      flexDirection="row"
      gap="16"
      p="12"
      rounded="md"
    >
      <Link href={href}>
        <Box
          bg="bg.default.hovered"
          display="grid"
          placeItems="center"
          rounded="md"
          size="2xl"
        >
          {icon}
        </Box>

        <Box flex="1">
          <Heading fontSize="xl" fontWeight="600" level="4">
            {title}
          </Heading>
          <Text lineClamp="2" mt="4">
            {children}
          </Text>
        </Box>
      </Link>
    </Flex>
  );
}
