"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          results: [
            { name: "Widget A" },
            { name: "Widget B" },
            { name: "Widget C" },
          ],
        }}
        element={{
          $type: "Document",
          body: {
            $type: "Map",
            children: {
              $type: "Text",
              children: { $type: "Value", path: "name" },
            },
            path: "/results",
          },
        }}
      />
    </Box>
  );
}
