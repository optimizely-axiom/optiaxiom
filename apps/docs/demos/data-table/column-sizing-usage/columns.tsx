import { Badge } from "@optiaxiom/react";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<{
  amount: number;
  firstName: string;
  lastName: string;
  status: "failed" | "processing" | "success";
}>();

const mapStatusToIntent = {
  failed: "danger",
  processing: "warning",
  success: "success",
} as const;

export const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    size: 240,
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    size: 120,
  }),
  columnHelper.accessor("status", {
    cell: ({ getValue }) => (
      <Badge intent={mapStatusToIntent[getValue()]}>{getValue()}</Badge>
    ),
    enableResizing: false,
    header: "Status",
    size: 120,
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue }) => `$${renderValue()}`,
    enableResizing: false,
    header: "Amount",
    size: 100,
  }),
];
