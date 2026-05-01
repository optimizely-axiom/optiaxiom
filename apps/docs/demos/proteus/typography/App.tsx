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
            { $type: "Heading", children: "Key Insight", level: "4" },
            {
              $type: "Text",
              children:
                "Initial performance metrics reveal a 12% drop in user retention post-update. Immediate deep-dive into Android Scrum Project's V2.2 onboarding flow is critical to reverse the trend and secure Q3 engagement goals.",
              color: "fg.secondary",
              fontSize: "sm",
            },
            {
              $type: "Link",
              children: "View task TSK-98",
              href: "https://example.com/task/tsk-98",
            },
          ],
        }}
      />
    </Box>
  );
}
