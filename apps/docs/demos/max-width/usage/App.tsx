import { Box } from "@optiaxiom/react";

import { Canvas } from "@/demos/Canvas";

export function App() {
  return (
    <Canvas flexDirection="column" striped>
      <Box maxW="lg" w="full">
        maxW=lg
      </Box>
      <Box maxW="md" w="full">
        maxW=md
      </Box>
      <Box maxW="sm" w="full">
        maxW=sm
      </Box>
      <Box maxW="xs" w="full">
        maxW=xs
      </Box>
    </Canvas>
  );
}
