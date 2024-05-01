import { Box, Stack } from "@optiaxiom/react";

import { Canvas } from "./Canvas";

export function App() {
  return (
    <Canvas>
      <Stack flexDirection="horizontal">
        <Box w="1/2">w=1/2</Box>
        <Box w="1/2">w=1/2</Box>
      </Stack>

      <Stack flexDirection="horizontal">
        <Box w="1/3">w=1/3</Box>
        <Box w="2/3">w=2/3</Box>
      </Stack>

      <Stack display={["none", "flex"]} flexDirection="horizontal">
        <Box w="1/4">w=1/4</Box>
        <Box w="3/4">w=3/4</Box>
      </Stack>
    </Canvas>
  );
}
