import type { ComponentPropsWithoutRef } from "react";

import { Avatar, Group, Text } from "@optiaxiom/react";

export function App({
  overflow = "visible",
}: Pick<ComponentPropsWithoutRef<typeof Group>, "overflow">) {
  return (
    <Group
      border="1"
      gap="16"
      maxW="xs"
      overflow={overflow}
      py="16"
      rounded="md"
      shadow="md"
      w="full"
    >
      <Avatar
        size="3xl"
        src="https://i.pravatar.cc/300?u=jane@doe.example"
        style={{
          margin: -24,
          marginRight: 0,
        }}
      />
      <Text fontSize="md" fontWeight="600">
        Sample User
      </Text>
    </Group>
  );
}
