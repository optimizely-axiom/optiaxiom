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
      <DemoBox pt="12">pt=12</DemoBox>
      <DemoBox pr="16">pr=16</DemoBox>
      <DemoBox pb="24">pb=24</DemoBox>
      <DemoBox pl="32">pl=32</DemoBox>
    </Group>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.avatar.purple"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      rounded="sm"
      {...props}
    >
      <Text bg="bg.default.pressed" p="4" rounded="inherit">
        {children}
      </Text>
    </Box>
  );
}
