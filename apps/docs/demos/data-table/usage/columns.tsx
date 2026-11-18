import { Badge } from "@optiaxiom/react";
import { createColumnHelper, tableFeatures } from "@tanstack/react-table";

export const features = tableFeatures({});

const columnHelper = createColumnHelper<
  typeof features,
  {
    amount: number;
    firstName: string;
    lastName: string;
    status: "failed" | "processing" | "success";
  }
>();

const mapStatusToIntent = {
  failed: "danger",
  processing: "warning",
  success: "success",
} as const;

export const columns = columnHelper.columns([
  columnHelper.accessor("firstName", {
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
  }),
  columnHelper.accessor("status", {
    cell: ({ getValue }) => (
      <Badge intent={mapStatusToIntent[getValue()]}>{getValue()}</Badge>
    ),
    header: "Status",
  }),
  columnHelper.accessor("amount", {
    cell: ({ renderValue }) => `$${renderValue()}`,
    header: "Amount",
  }),
]);
