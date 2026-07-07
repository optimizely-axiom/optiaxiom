"use client";

import { ProteusDocumentRenderer } from "@optiaxiom/proteus";
import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="lg" w="full">
      <ProteusDocumentRenderer
        data={{
          changes: [
            {
              field: "Status",
              newValue: "Running",
              oldValue: "Paused",
              type: "modified",
            },
            {
              field: "Description",
              newValue: "Updated experiment for Q3 launch",
              oldValue: "—",
              type: "added",
            },
            {
              field: "Legacy Flag",
              newValue: "—",
              oldValue: "enabled",
              type: "removed",
            },
          ],
        }}
        element={{
          $type: "Document",
          body: {
            $type: "DataTable",
            columns: [
              { accessorKey: "field", header: "Field", size: 150 },
              { accessorKey: "oldValue", header: "Old", size: 110 },
              { accessorKey: "newValue", header: "New", size: 170 },
              {
                accessorKey: "type",
                // `cell` is a regular Proteus node. `DataTableRow` reads the
                // current row inside it, and a Show/else chain picks the badge
                // intent per row.
                cell: {
                  $type: "Badge",
                  children: { $type: "DataTableRow", path: "type" },
                  intent: {
                    $type: "Show",
                    children: "success",
                    else: {
                      $type: "Show",
                      children: "danger",
                      else: "warning",
                      when: {
                        "==": [
                          { $type: "DataTableRow", path: "type" },
                          "removed",
                        ],
                      },
                    },
                    when: {
                      "==": [{ $type: "DataTableRow", path: "type" }, "added"],
                    },
                  },
                },
                header: "Change",
                size: 120,
              },
            ],
            data: { $type: "Value", path: "/changes" },
          },
          title: "Flag Configuration Changes",
        }}
      />
    </Box>
  );
}
