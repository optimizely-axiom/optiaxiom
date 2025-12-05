import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <DemoBox display={["none", "grid"]} w="384">
        w=384
      </DemoBox>
      <DemoBox w="224">w=224</DemoBox>
      <DemoBox w="3xl">w=3xl</DemoBox>
      <DemoBox w="64">w=64</DemoBox>
    </Flex>
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
