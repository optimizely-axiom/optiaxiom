import type { ReactNode } from "react";

import { Flex, Heading, Text } from "@optiaxiom/react";

import styles from "./Panel.module.css";

export function Panel({
  children,
  description,
  title,
}: {
  children?: ReactNode;
  description: ReactNode;
  title: ReactNode;
}) {
  return (
    <Flex
      bg="bg.warning.subtle"
      className={styles.panel}
      gap="4"
      p="12"
      rounded="sm"
    >
      <Heading level="6">{title}</Heading>
      <Text>{description}</Text>
      {children}
    </Flex>
  );
}
