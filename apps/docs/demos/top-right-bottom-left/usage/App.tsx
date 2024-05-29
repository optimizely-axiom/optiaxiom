import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box left="0" position="absolute" size="64" top="0">
        01
      </Box>
      <Box h="64" insetX="0" position="absolute" top="0">
        02
      </Box>
      <Box position="absolute" right="0" size="64" top="0">
        03
      </Box>
      <Box insetY="0" left="0" position="absolute" w="64">
        04
      </Box>
      <Box inset="0" position="absolute">
        05
      </Box>
      <Box insetY="0" position="absolute" right="0" w="64">
        06
      </Box>
      <Box bottom="0" left="0" position="absolute" size="64">
        07
      </Box>
      <Box bottom="0" h="64" insetX="0" position="absolute">
        08
      </Box>
      <Box bottom="0" position="absolute" right="0" size="64">
        09
      </Box>
    </Canvas>
  );
}
