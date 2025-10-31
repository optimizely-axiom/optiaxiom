import { AxiomProvider, Box } from "@optiaxiom/react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <AxiomProvider>
    <Box
      display="flex"
      flex="1"
      flexDirection="row"
      gap="0"
      justifyContent="start"
      maxW="full"
      overflow="auto"
      p="32"
    >
      <App />
    </Box>
  </AxiomProvider>,
);
