"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{ status: "running", widgetName: "Experiment Results" }}
        element={{
          $type: "Document",
          appName: "Federated Widget",
          body: [
            {
              $type: "Text",
              children: "Remote component loaded via Module Federation:",
            },
            {
              $type: "Federated",
              entry: `${basePath}/federated-widget/remoteEntry.js`,
              exposeKey: "./App",
            },
          ],
          title: "Federated Component",
        }}
      />
    </Box>
  );
}
