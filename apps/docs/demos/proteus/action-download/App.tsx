"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          download_url:
            "https://example.com/files/strategic-pitch-presentation.pptx",
        }}
        element={{
          $type: "Document",
          actions: [
            {
              $type: "Action",
              appearance: "primary",
              children: "Download",
              onClick: {
                action: "download",
                url: { $type: "Value", path: "/download_url" },
              },
            },
          ],
          body: [
            {
              $type: "Image",
              alt: "Slide preview of Strategic Pitch Presentation",
              src: "https://placehold.co/560x315",
            },
          ],
          subtitle: "Google Slides",
          title: "Strategic Pitch Presentation",
        }}
      />
    </Box>
  );
}
