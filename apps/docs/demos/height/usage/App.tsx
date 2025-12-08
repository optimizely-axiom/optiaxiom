import type { ComponentPropsWithoutRef } from "react";

import { Box, Group } from "@optiaxiom/react";

export function App() {
  return (
    <Group alignItems="end" gap="16" justifyContent="space-around" w="full">
      <DemoBox display={["none", "grid"]} h="384">
        h=384
      </DemoBox>
      <DemoBox display={["none", "grid"]} h="224">
        h=224
      </DemoBox>
      <DemoBox h="3xl">h=3xl</DemoBox>
      <DemoBox h="64">h=64</DemoBox>
      <DemoBox h="xl">h=xl</DemoBox>
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
