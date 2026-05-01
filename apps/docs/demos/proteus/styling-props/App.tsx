"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          body: {
            $type: "Group",
            border: "1",
            borderColor: "border.tertiary",
            children: [
              {
                $type: "Text",
                children: "TOTAL REVENUE",
                color: "fg.tertiary",
                fontSize: "xs",
                textTransform: "uppercase",
              },
              {
                $type: "Text",
                children: "$204M",
                fontSize: "2xl",
                fontWeight: "700",
              },
              {
                $type: "Text",
                children: "+12% vs last quarter",
                color: "fg.success.strong",
                fontSize: "sm",
              },
            ],
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
