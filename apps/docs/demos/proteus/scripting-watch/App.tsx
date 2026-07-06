"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [data, setData] = useState<Record<string, unknown>>({
    items: [
      { done: false, label: "Accept terms" },
      { done: false, label: "Verify email" },
      { done: false, label: "Add payment method" },
    ],
  });

  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={data}
        element={{
          $type: "Document",
          body: [
            {
              $type: "Text",
              children: "Tick every item to unlock the next step.",
              color: "fg.secondary",
            },
            {
              $type: "Group",
              children: {
                $type: "Map",
                children: {
                  $type: "Switch",
                  children: { $type: "Value", path: "label" },
                  name: "done",
                },
                path: "/items",
              },
              flexDirection: "column",
              gap: "8",
            },
            {
              $type: "Show",
              children: {
                $type: "Alert",
                children: "All items complete — you're good to go!",
                intent: "success",
              },
              when: { "!!": { $type: "Value", path: "/all_done" } },
            },
          ],
          // A watcher reacts to data changes (edge-triggered) — the push
          // counterpart to `register`. It runs once on the false→true edge and
          // its own setValue write does not re-trigger it, so it can't loop.
          scripts: {
            main: [
              "watch('/items', (ctx, current) => {",
              "  const items = current || [];",
              "  const done = items.length > 0 && items.every((i) => i.done === true);",
              "  ctx.emit({ action: 'setValue', path: '/all_done', value: done });",
              "});",
            ].join("\n"),
          },
          title: "Reactive watcher",
        }}
        onDataChange={setData}
      />
    </Box>
  );
}
