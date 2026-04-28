"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          items: [{ name: "Apples" }, { name: "Oranges" }, { name: "Pears" }],
        }}
        element={{
          $type: "Document",
          body: {
            $type: "Map",
            children: {
              $type: "Group",
              children: [
                {
                  $type: "Text",
                  children: { $type: "MapIndex" },
                  color: "fg.tertiary",
                },
                {
                  $type: "Text",
                  children: { $type: "Value", path: "name" },
                  fontWeight: "600",
                },
              ],
              flexDirection: "row",
              gap: "8",
            },
            path: "/items",
          },
        }}
      />
    </Box>
  );
}
