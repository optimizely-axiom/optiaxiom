"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [data, setData] = useState<Record<string, unknown>>({});
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={data}
        element={{
          $type: "Document",
          body: [
            {
              $type: "Field",
              children: {
                $type: "Select",
                children: [
                  { $type: "SelectTrigger", w: "full" },
                  { $type: "SelectContent" },
                ],
                name: "target_by",
                options: [
                  { label: "URL", value: "url" },
                  { label: "Saved Pages", value: "page" },
                ],
              },
              label: "Target by",
            },
            {
              $type: "Field",
              children: {
                $type: "Input",
                name: "url",
                placeholder: "Add a URL",
              },
              label: "URL",
            },
            {
              $type: "Field",
              children: {
                $type: "Textarea",
                name: "test_idea",
                placeholder:
                  "e.g., Add quantity badges to product thumbnails to show how many of each item they're buying",
              },
              label: "Test Idea",
            },
            {
              $type: "Field",
              children: { $type: "Switch", name: "include_metadata" },
              label: "Include Metadata",
            },
          ],
        }}
        onDataChange={setData}
      />
    </Box>
  );
}
