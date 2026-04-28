"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{ items: [1, 2, 3], status: "ready" }}
        element={{
          $type: "Document",
          body: {
            $type: "Show",
            children: {
              $type: "Text",
              children: "All items loaded.",
              color: "fg.success",
            },
            when: {
              and: [
                { "!!": { $type: "Value", path: "/items" } },
                { "!=": [{ $type: "Value", path: "/status" }, "loading"] },
              ],
            },
          },
        }}
      />
    </Box>
  );
}
