"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [data, setData] = useState<Record<string, unknown>>({
    status: "draft",
  });

  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={data}
        element={{
          $type: "Document",
          actions: [
            {
              $type: "Action",
              appearance: "primary",
              children: "Mark as published",
              // `setValue` writes `value` at `path`, replacing any existing
              // value. `pushValue` / `removeValue` cover appending to and
              // removing from arrays.
              onClick: {
                action: "setValue",
                path: "/status",
                value: "published",
              },
            },
          ],
          body: [
            {
              $type: "Text",
              children: [
                "Current status: ",
                { $type: "Value", path: "/status" },
              ],
            },
          ],
          title: "In-place data edits",
        }}
        onDataChange={setData}
      />
    </Box>
  );
}
