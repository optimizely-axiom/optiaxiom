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
            border: "1",
            borderColor: "border.tertiary",
            children: [
              {
                $type: "Group",
                children: [
                  {
                    $type: "Text",
                    children: "Add quantity badges to product thumbnails",
                    fontWeight: "600",
                  },
                  {
                    $type: "Text",
                    children: "TSK-8526",
                    color: "fg.tertiary",
                    fontSize: "sm",
                  },
                ],
                flexDirection: "column",
                gap: "4",
                p: "12",
              },
              { $type: "Separator", borderColor: "border.tertiary" },
              {
                $type: "Group",
                children: [
                  {
                    $type: "Text",
                    children: "D-Congress 2026 - Digital screen content",
                    fontWeight: "600",
                  },
                  {
                    $type: "Text",
                    children: "TSK-9102",
                    color: "fg.tertiary",
                    fontSize: "sm",
                  },
                ],
                flexDirection: "column",
                gap: "4",
                p: "12",
              },
            ],
            flexDirection: "column",
            rounded: "md",
          },
        }}
      />
    </Box>
  );
}
