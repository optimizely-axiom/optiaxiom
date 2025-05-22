"use client";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas asChild striped>
      <Flex flexDirection="row" h="224">
        <Box flex="1" p="64">
          01
        </Box>
        <Box alignSelf={["stretch", "center"]} flex="1" p="32">
          02
        </Box>
        <Box flex="1" p="64">
          03
        </Box>
      </Flex>
    </Canvas>
  );
}
