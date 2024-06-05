import { Box } from "@optiaxiom/react";

import { Canvas } from "../Canvas";
import styles from "./App.module.css";

export function App() {
  return (
    <Canvas>
      <Box className={styles.base} transition="colors">
        Contact Us
      </Box>
    </Canvas>
  );
}
