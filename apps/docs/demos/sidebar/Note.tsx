import type { ReactNode } from "react";

import { Flex, Heading, Text } from "@optiaxiom/react";

import styles from "./Note.module.css";

export function Note({
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
      className={styles.note}
      gap="4"
      p="12"
      rounded="sm"
    >
      <Heading fontSize="md">{title}</Heading>
      <Text>{description}</Text>
      {children}
    </Flex>
  );
}
