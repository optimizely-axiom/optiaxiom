import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group
      alignItems="start"
      flexDirection={["column", "row"]}
      gap="16"
      justifyContent="space-around"
      w="full"
    >
      <DemoBox size="xs">size=xs</DemoBox>
      <DemoBox size="sm">size=sm</DemoBox>
      <DemoBox size="md">size=md</DemoBox>
      <DemoBox size="lg">size=lg</DemoBox>
      <DemoBox size="xl">size=xl</DemoBox>
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
      <Box bg="bg.avatar.purple" rounded="sm" {...props} />
    </Group>
  );
}
