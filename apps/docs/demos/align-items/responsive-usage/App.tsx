"use client";

import { Canvas } from "@/demos/Canvas";
import { Box, Flex } from "@optiaxiom/react";

export function App() {
  return (
    <Canvas asChild striped>
      <Flex alignItems={["stretch", "center"]} flexDirection="row" h="224">
        <Box flex="1" p="32">
          01
        </Box>
        <Box flex="1" p="64">
          02
        </Box>
        <Box flex="1" p="48">
          03
        </Box>
      </Flex>
    </Canvas>
  );
}
