import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group
      alignItems="center"
      flexDirection={["column", "row"]}
      gap="16"
      justifyContent="space-around"
      w="full"
    >
      <DemoBox rounded="sm">rounded=sm</DemoBox>
      <DemoBox rounded="md">rounded=md</DemoBox>
      <DemoBox rounded="lg">rounded=lg</DemoBox>
      <DemoBox rounded="full">rounded=full</DemoBox>
    </Group>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Group alignItems="center" flexDirection="column" gap="8">
      <Text
        color="fg.tertiary"
        fontFamily="mono"
        fontSize="md"
        fontWeight="600"
        textAlign="center"
      >
        {children}
      </Text>
      <Box
        bg="bg.avatar.purple"
        display="grid"
        placeItems="center"
        size="56"
        {...props}
      />
    </Group>
  );
}
