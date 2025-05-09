import type { ComponentPropsWithoutRef } from "react";

import { Avatar, Flex, Text } from "@optiaxiom/react";

export function App({
  overflow = "visible",
}: Pick<ComponentPropsWithoutRef<typeof Flex>, "overflow">) {
  return (
    <Flex
      border="1"
      flexDirection="row"
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
    </Flex>
  );
}
