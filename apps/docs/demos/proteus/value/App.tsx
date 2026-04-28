"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          count: 42,
          query: "axiom buttons",
        }}
        element={{
          $type: "Document",
          body: [
            {
              $type: "Heading",
              children: { $type: "Value", path: "/count" },
              level: "2",
            },
            {
              $type: "Text",
              children: "results found",
              color: "fg.secondary",
            },
          ],
          title: { $type: "Value", path: "/query" },
        }}
      />
    </Box>
  );
}
