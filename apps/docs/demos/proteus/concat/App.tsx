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
              $type: "Text",
              children: {
                $type: "Concat",
                children: [
                  "#",
                  { $type: "MapIndex" },
                  " — ",
                  { $type: "Value", path: "name" },
                ],
              },
            },
            path: "/items",
          },
        }}
      />
    </Box>
  );
}
