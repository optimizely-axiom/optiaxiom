import type { ComponentPropsWithoutRef } from "react";

import { Box, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection="column" gap="16" w="full">
      <Group gap="16">
        <DemoBox w="1/2">w=1/2</DemoBox>
        <DemoBox w="1/2">w=1/2</DemoBox>
      </Group>
      <Group gap="16">
        <DemoBox w="1/3">w=1/3</DemoBox>
        <DemoBox w="2/3">w=2/3</DemoBox>
      </Group>
      <Group display={["none", "flex"]} gap="16">
        <DemoBox w="1/4">w=1/4</DemoBox>
        <DemoBox w="3/4">w=3/4</DemoBox>
      </Group>
    </Group>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.avatar.purple"
      display="grid"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      p="16"
      placeItems="center"
      rounded="sm"
      {...props}
    >
      {children}
    </Box>
  );
}
