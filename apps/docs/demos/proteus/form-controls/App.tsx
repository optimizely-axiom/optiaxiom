"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          body: [
            {
              $type: "Field",
              children: {
                $type: "Input",
                name: "email",
                placeholder: "you@example.com",
                required: true,
              },
              label: "Email",
            },
            {
              $type: "Field",
              children: {
                $type: "Select",
                children: [
                  { $type: "SelectTrigger", w: "full" },
                  { $type: "SelectContent" },
                ],
                name: "plan",
                options: [
                  { label: "Starter", value: "starter" },
                  { label: "Pro", value: "pro" },
                  { label: "Enterprise", value: "enterprise" },
                ],
              },
              label: "Plan",
            },
            {
              $type: "Field",
              children: {
                $type: "Textarea",
                name: "notes",
                placeholder: "Anything we should know?",
              },
              label: "Notes",
            },
            {
              $type: "Field",
              children: { $type: "Switch", name: "notifications" },
              label: "Email me product updates",
            },
          ],
        }}
      />
    </Box>
  );
}
