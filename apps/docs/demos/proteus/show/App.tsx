"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [data, setData] = useState<Record<string, unknown>>({
    target_by: "url",
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
                  $type: "Input",
                  name: "url",
                  placeholder: "Add a URL",
                },
                label: "URL",
              },
              when: {
                "==": [{ $type: "Value", path: "/target_by" }, "url"],
              },
            },
            {
              $type: "Show",
              children: {
                $type: "Field",
                children: {
                  $type: "Select",
                  children: [
                    { $type: "SelectTrigger", w: "full" },
                    { $type: "SelectContent" },
                  ],
                  name: "saved_page",
                  options: [
                    { label: "Home page", value: "home" },
                    { label: "Marketplace", value: "marketplace" },
                    { label: "Product Details", value: "product_details" },
                  ],
                },
                label: "Saved Page",
              },
              when: {
                "==": [{ $type: "Value", path: "/target_by" }, "page"],
              },
            },
          ],
        }}
        onDataChange={setData}
      />
    </Box>
  );
}
