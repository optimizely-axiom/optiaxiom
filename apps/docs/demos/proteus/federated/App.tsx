"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          appName: "Federated Widget",
          body: [
            {
              $type: "Text",
              children:
                "The remote below is intentionally unreachable so the fallback renders:",
            },
            {
              $type: "Federated",
              entry: "https://invalid.example.com/remoteEntry.js",
              fallback: [
                {
                  $type: "Card",
                  children: [
                    {
                      $type: "CardHeader",
                      children: "Remote unavailable",
                    },
                    {
                      $type: "Text",
                      children:
                        "The federated remote could not be loaded. This fallback content keeps the document usable.",
                    },
                  ],
                },
              ],
            },
          ],
          title: "Federated Component",
        }}
      />
    </Box>
  );
}
