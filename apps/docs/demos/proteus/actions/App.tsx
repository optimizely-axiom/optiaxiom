"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          actions: [
            {
              $type: "Action",
              appearance: "danger",
              children: "Delete project",
              onClick: { interaction: "delete_project" },
            },
            { $type: "CancelAction", children: "Keep project" },
          ],
          body: [],
          subtitle:
            "This permanently removes the project and all of its experiments. This cannot be undone.",
          title: "Delete project?",
        }}
      />
    </Box>
  );
}
