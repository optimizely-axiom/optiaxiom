"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [data, setData] = useState<Record<string, unknown>>({ tags: [] });

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
              children: "Add tag",
              // Triggers a named handler from the `scripts` map. The handler
              // decides which events to emit — here it appends the input value.
              onClick: {
                params: { tag: { $type: "Value", path: "/tag" } },
                script: "main:addTag",
              },
            },
          ],
          body: [
            {
              $type: "Field",
              children: {
                $type: "Input",
                name: "tag",
                placeholder: "Enter a tag",
              },
              label: "Tag",
            },
            {
              $type: "Group",
              children: {
                $type: "Map",
                children: {
                  $type: "Badge",
                  children: { $type: "Value", path: "" },
                },
                path: "/tags",
              },
              flexDirection: "row",
              gap: "8",
            },
          ],
          // Scripts run in a sandboxed Web Worker. A handler's only capability
          // is `ctx.emit`, so it can affect the document only through the
          // existing Proteus events.
          scripts: {
            main: [
              "register('addTag', (ctx, params) => {",
              "  const tag = params.tag;",
              "  if (!tag) return;",
              "  ctx.emit({ action: 'pushValue', path: '/tags', value: tag });",
              "});",
            ].join("\n"),
          },
          title: "Scripted actions",
        }}
        onDataChange={setData}
      />
    </Box>
  );
}
