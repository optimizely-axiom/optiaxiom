"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          body: {
            $type: "Group",
            children: [
              {
                $type: "Card",
                children: [
                  { $type: "CardHeader", children: "Notifications" },
                  {
                    $type: "Text",
                    children: "We'll email you when a deploy finishes.",
                  },
                ],
              },
              { $type: "Separator" },
              {
                $type: "Card",
                children: [
                  { $type: "CardHeader", children: "Workspace" },
                  {
                    $type: "Text",
                    children: "Acme Inc. — 12 members",
                  },
                ],
              },
            ],
            flexDirection: "column",
            gap: "12",
          },
        }}
      />
    </Box>
  );
}
