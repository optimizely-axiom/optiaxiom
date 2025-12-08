import type { ReactNode } from "react";

import { Group, Heading, Text } from "@optiaxiom/react";

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
    <Group
      bg="bg.warning.subtle"
      className={styles.note}
      flexDirection="column"
      gap="4"
      p="12"
      rounded="sm"
    >
      <Heading fontSize="md">{title}</Heading>
      <Text>{description}</Text>
      {children}
    </Group>
  );
}
