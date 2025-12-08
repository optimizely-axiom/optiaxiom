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
      <DemoBox shadow="none">shadow=none</DemoBox>
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
        display="grid"
        placeItems="center"
        shadow="md"
        size="56"
        {...props}
      />
    </Group>
  );
}
