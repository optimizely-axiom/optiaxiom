"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{ error: "Could not connect to the database." }}
        element={{
          $type: "Document",
          body: {
            $type: "Show",
            children: {
              $type: "Text",
              children: { $type: "Value", path: "/error" },
              color: "fg.error",
            },
            when: { "!!": { $type: "Value", path: "/error" } },
          },
        }}
      />
    </Box>
  );
}
