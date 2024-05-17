import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";

export function App() {
  return (
    <Canvas>
      <Box sx={{ ":focus-visible": { ring: "2", ringColor: "purple.200" } }}>
        Save Changes
      </Box>
    </Canvas>
  );
}
