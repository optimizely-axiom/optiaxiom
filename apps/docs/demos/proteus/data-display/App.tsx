"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="md" w="full">
      <ProteusDocumentRenderer
        element={{
          $type: "Document",
          appName: "Salesforce CRM",
          body: {
            $type: "DataTable",
            columns: [
              { accessorKey: "rank", header: "Rank", size: 80 },
              { accessorKey: "representative", header: "Representative" },
              { accessorKey: "deals", header: "Deals Closed", size: 120 },
              { accessorKey: "revenue", header: "Revenue", size: 120 },
            ],
            data: [
              {
                deals: "47",
                rank: "1",
                representative: "Sarah Chen",
                revenue: "$2.8M",
              },
              {
                deals: "42",
                rank: "2",
                representative: "Michael Wong",
                revenue: "$2.5M",
              },
              {
                deals: "39",
                rank: "3",
                representative: "Jenn Taylor",
                revenue: "$2.3M",
              },
              {
                deals: "35",
                rank: "4",
                representative: "David Smith",
                revenue: "$2.1M",
              },
              {
                deals: "33",
                rank: "5",
                representative: "Emily Johnson",
                revenue: "$2.0M",
              },
            ],
          },
          subtitle: "October 1 - December 31, 2025",
          title: "Q4 2024 Sales Performance",
        }}
      />
    </Box>
  );
}
