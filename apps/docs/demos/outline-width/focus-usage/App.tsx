import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box
        sx={{ ":focus-visible": { outline: "2", outlineColor: "purple.200" } }}
      >
        Save Changes
      </Box>
    </Canvas>
  );
}
