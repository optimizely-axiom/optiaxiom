"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          parameters: [
            { name: "Campaign Name", value: "spring-sale-2024" },
            { name: "Landing Page URL", value: "https://example.com/landing" },
            { name: "Channel", value: null },
          ],
        }}
        element={{
          $type: "Document",
          actions: [
            {
              $type: "Action",
              appearance: "primary-opal",
              children: "Run agent",
              onClick: {
                message: {
                  $type: "Map",
                  children: {
                    $type: "Concat",
                    children: [
                      { $type: "Value", path: "name" },
                      ": ",
                      {
                        $type: "Show",
                        children: "[Not specified]",
                        when: { "!": { $type: "Value", path: "value" } },
                      },
                      {
                        $type: "Show",
                        children: { $type: "Value", path: "value" },
                        when: { "!!": { $type: "Value", path: "value" } },
                      },
                    ],
                  },
                  path: "/parameters",
                  separator: "\n",
                },
              },
            },
          ],
          body: [
            {
              $type: "Text",
              children:
                "Click the button to see how Concat formats the parameter values into a single message.",
            },
          ],
          title: "UTM Creation",
        }}
        onMessage={(msg) => {
          toaster.create(typeof msg === "string" ? msg : JSON.stringify(msg));
        }}
      />
    </Box>
  );
}
