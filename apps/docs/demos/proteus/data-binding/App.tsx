"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        data={{
          table_data: [
            {
              cmp_url: "https://example.com/task/id-123",
              owner: "John Doe",
              reference: "TSK-8526",
              status: "Overdue",
              title: "Add quantity badges to product thumbnails",
            },
            {
              cmp_url: "https://example.com/task/id-345",
              owner: "Jane Doe",
              reference: "TSK-9102",
              status: "In Progress",
              title: "D-Congress 2026 - Digital screen content",
            },
          ],
          total_results: 2,
        }}
        element={{
          $type: "Document",
          appName: "Content Marketing Platform",
          body: {
            $type: "Map",
            children: {
              $type: "Card",
              children: {
                $type: "CardHeader",
                children: {
                  $type: "CardLink",
                  children: { $type: "Value", path: "title" },
                  href: { $type: "Value", path: "cmp_url" },
                },
                description: { $type: "Value", path: "reference" },
              },
            },
            path: "/table_data",
          },
          title: [{ $type: "Value", path: "/total_results" }, " results found"],
        }}
      />
    </Box>
  );
}
