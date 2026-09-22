import { Group, Text } from "@optiaxiom/react";

export const TypographyIcon = () => (
  <Group alignItems="end" gap="2" w="xl">
    <Text asChild fontSize="2xl" fontWeight="600">
      <span>A</span>
    </Text>
    <Text asChild fontSize="md" fontWeight="500">
      <span>a</span>
    </Text>
  </Group>
);
