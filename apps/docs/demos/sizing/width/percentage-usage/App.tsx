import { Box, Stack } from "@optiaxiom/react";

import { Canvas } from "./Canvas";

export function App() {
  return (
    <Canvas>
      <Stack flexDirection="horizontal">
        <Box width="1/2">width=1/2</Box>
        <Box width="1/2">width=1/2</Box>
      </Stack>

      <Stack flexDirection="horizontal">
        <Box width="1/3">width=1/3</Box>
        <Box width="2/3">width=2/3</Box>
      </Stack>

      <Stack display={["none", "flex"]} flexDirection="horizontal">
        <Box width="1/4">width=1/4</Box>
        <Box width="3/4">width=3/4</Box>
      </Stack>
    </Canvas>
  );
}
