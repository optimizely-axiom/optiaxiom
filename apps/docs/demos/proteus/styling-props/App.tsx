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
            bg: "bg.error.subtle",
            children: [
              {
                $type: "Text",
                children: "Build failed",
                color: "fg.error",
                fontWeight: "600",
              },
              {
                $type: "Text",
                children:
                  "TypeScript reported 3 errors in apps/web. See the run output for details.",
                color: "fg.error",
                fontSize: "sm",
              },
            ],
            flexDirection: "column",
            gap: "8",
            p: "16",
            rounded: "md",
          },
        }}
      />
    </Box>
  );
}
