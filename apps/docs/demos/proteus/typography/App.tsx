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
            { $type: "Heading", children: "Deployment paused" },
            {
              $type: "Text",
              children:
                "Your last deploy was rolled back due to a failed health check. Review the logs for the full trace before retrying.",
              color: "fg.secondary",
              fontSize: "sm",
            },
            {
              $type: "Link",
              children: "Open run #482",
              href: "https://example.com/runs/482",
            },
          ],
        }}
      />
    </Box>
  );
}
