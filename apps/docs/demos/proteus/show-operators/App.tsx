"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [data, setData] = useState<Record<string, unknown>>({
    target_by: "url",
    url: "https://example.com",
  });
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
              $type: "Show",
              children: {
                $type: "Field",
                children: {
                  $type: "Textarea",
                  name: "test_idea",
                  placeholder:
                    "e.g., Add quantity badges to product thumbnails",
                },
                label: "Test Idea",
              },
              when: {
                or: [
                  {
                    and: [
                      {
                        "==": [{ $type: "Value", path: "/target_by" }, "url"],
                      },
                      { "!!": { $type: "Value", path: "/url" } },
                    ],
                  },
                  {
                    and: [
                      {
                        "==": [{ $type: "Value", path: "/target_by" }, "page"],
                      },
                      { "!!": { $type: "Value", path: "/saved_page" } },
                    ],
                  },
                ],
              },
            },
          ],
        }}
        onDataChange={setData}
      />
    </Box>
  );
}
