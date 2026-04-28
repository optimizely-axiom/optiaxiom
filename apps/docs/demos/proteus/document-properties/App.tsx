"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          actions: [
            { $type: "Action", appearance: "primary", children: "Submit" },
            { $type: "Action", children: "Cancel" },
          ],
          appName: "Issue Tracker",
          blocking: true,
          body: [
            {
              $type: "Field",
              children: {
                $type: "Input",
                name: "title",
                placeholder: "Login button doesn't work on mobile",
                required: true,
              },
              label: "Title",
            },
            {
              $type: "Field",
              children: {
                $type: "Textarea",
                name: "steps",
                placeholder: "1. Open the app on iOS\n2. Tap Sign in\n3. ...",
              },
              label: "Steps to reproduce",
            },
          ],
          subtitle: "Tell us what went wrong and we'll take a look.",
          title: "Report an issue",
        }}
      />
    </Box>
  );
}
