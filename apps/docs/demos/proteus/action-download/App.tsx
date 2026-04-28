"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{ download_url: "https://example.com/reports/q1-2026.pdf" }}
        element={{
          $type: "Document",
          actions: [
            {
              $type: "Action",
              appearance: "primary",
              children: "Download report",
              onClick: {
                action: "download",
                url: { $type: "Value", path: "/download_url" },
              },
            },
          ],
          body: [],
          subtitle: "Q1 2026 metrics are compiled and ready to download.",
          title: "Quarterly report ready",
        }}
      />
    </Box>
  );
}
