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
              children: "Comment",
              onClick: {
                message: "I'd like to leave a comment on this task.",
              },
            },
            {
              $type: "Action",
              appearance: "primary",
              children: "View task",
              onClick: {
                message: "Show me the full details for TSK-98.",
              },
            },
          ],
          appName: "Content Marketing Platform",
          body: [
            {
              $type: "Text",
              children:
                "Initial performance metrics reveal a 12% drop in user retention post-update.",
            },
          ],
          subtitle: "Android Scrum Campaign / TSK-98",
          title: "Version 2.2 Performance Optimization",
        }}
      />
    </Box>
  );
}
