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
              children: "Yes, proceed",
              onClick: { message: "Yes, proceed with the migration." },
            },
            {
              $type: "Action",
              children: "No, hold off",
              onClick: { message: "Hold off on the migration for now." },
            },
          ],
          body: [
            {
              $type: "Text",
              children:
                "Pick an option and we'll continue the conversation in chat.",
            },
          ],
        }}
      />
    </Box>
  );
}
