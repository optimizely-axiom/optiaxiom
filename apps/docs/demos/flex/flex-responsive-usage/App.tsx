"use client";

import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas asChild striped>
      <Flex flexDirection="row" h="224">
        <Box flex={["1", "none"]} w="224">
          01
        </Box>
        <Box w="80">02</Box>
      </Flex>
    </Canvas>
  );
}
