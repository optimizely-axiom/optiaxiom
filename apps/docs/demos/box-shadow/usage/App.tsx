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
      <DemoBox shadow="sm">shadow=sm</DemoBox>
      <DemoBox shadow="md">shadow=md</DemoBox>
      <DemoBox shadow="lg">shadow=lg</DemoBox>
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
      <Box display="grid" placeItems="center" size="56" {...props} />
    </Group>
  );
}
