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
              appearance: "primary",
              children: "Approve",
              onClick: { interaction: "approve_deploy" },
            },
            { $type: "CancelAction", children: "Cancel" },
          ],
          body: [],
          subtitle:
            "Submitting will run the deploy pipeline against production.",
          title: "Approve deploy?",
        }}
      />
    </Box>
  );
}
