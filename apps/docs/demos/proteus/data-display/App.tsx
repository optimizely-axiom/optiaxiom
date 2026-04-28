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
            $type: "DataTable",
            columns: [
              { accessorKey: "id", header: "Order" },
              { accessorKey: "customer", header: "Customer" },
              { accessorKey: "status", header: "Status" },
            ],
            data: [
              { customer: "Arthur Morgan", id: "#1024", status: "Shipped" },
              { customer: "John Marston", id: "#1025", status: "Processing" },
              { customer: "Sadie Adler", id: "#1026", status: "Delivered" },
            ],
          },
        }}
      />
    </Box>
  );
}
