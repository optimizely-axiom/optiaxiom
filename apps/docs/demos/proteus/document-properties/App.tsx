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
          actions: [
            {
              $type: "Action",
              appearance: "primary-opal",
              children: "Create Test Plan",
            },
          ],
          appName: "Opal",
          blocking: true,
          body: [
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
          ],
          subtitle: "Select how you'd like to define the page or experience.",
          title: "Create your test plan",
        }}
        onDataChange={setData}
      />
    </Box>
  );
}
