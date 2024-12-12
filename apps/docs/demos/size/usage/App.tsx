import { Box, Flex } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Flex alignItems="start" flexDirection="row" justifyContent="center">
        <Box size="xs">size=xs</Box>
        <Box size="sm">size=sm</Box>
        <Box size="md">size=md</Box>
        <Box size="lg">size=lg</Box>
        <Box size="xl">size=xl</Box>
      </Flex>
    </Canvas>
  );
}
