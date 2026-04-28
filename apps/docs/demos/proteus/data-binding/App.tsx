"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          results: [
            { name: "Widget A", sku: "WA-001" },
            { name: "Widget B", sku: "WB-002" },
            { name: "Widget C", sku: "WC-003" },
          ],
          title: "Search results",
        }}
        element={{
          $type: "Document",
          body: {
            $type: "Map",
            children: {
              $type: "Card",
              children: [
                {
                  $type: "CardHeader",
                  children: { $type: "Value", path: "name" },
                },
                {
                  $type: "Text",
                  children: { $type: "Value", path: "sku" },
                  color: "fg.secondary",
                  fontSize: "sm",
                },
              ],
            },
            path: "/results",
          },
          title: { $type: "Value", path: "/title" },
        }}
      />
    </Box>
  );
}
