"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          body: [
            { $type: "Heading", children: "Welcome to your dashboard" },
            {
              $type: "Text",
              children:
                "Proteus turns a JSON description into a fully interactive Axiom UI.",
            },
          ],
        }}
      />
    </Box>
  );
}
