"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          label: "TOTAL REVENUE",
          trend: "+12% vs last quarter",
          trendColor: "fg.success.strong",
          value: "$204M",
        }}
        element={{
          $type: "Document",
          body: {
            $type: "Group",
            border: "1",
            borderColor: "border.tertiary",
            children: [
              {
                $type: "Text",
                children: { $type: "Value", path: "label" },
                color: "fg.tertiary",
                fontSize: "xs",
                textTransform: "uppercase",
              },
              {
                $type: "Text",
                children: { $type: "Value", path: "value" },
                fontSize: "2xl",
                fontWeight: "700",
              },
              {
                $type: "Text",
                children: { $type: "Value", path: "trend" },
                color: { $type: "Value", path: "trendColor" },
                fontSize: "sm",
              },
            ],
            flex: "1",
            flexDirection: "column",
            gap: "4",
            p: "12",
            rounded: "xl",
          },
        }}
      />
    </Box>
  );
}
