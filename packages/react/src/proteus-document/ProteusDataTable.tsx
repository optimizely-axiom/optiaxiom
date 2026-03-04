import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "../data-table/DataTable";
import { DataTableBody } from "../data-table/DataTableBody";
import { useProteusValue } from "./useProteusValue";

export const ProteusDataTable = ({
  columns,
  data,
  path,
}: {
  columns: { accessorKey: string; header: string }[];
  data?: Record<string, unknown>[];
  path?: string;
}) => {
  const resolvedData = useProteusValue(path ?? "");
  const tableData = data ?? (Array.isArray(resolvedData) ? resolvedData : []);

  const columnHelper = createColumnHelper<Record<string, unknown>>();
  const columnDefs = columns.map((col) =>
    columnHelper.accessor(col.accessorKey, {
      header: col.header,
    }),
  );

  const table = useReactTable({
    columns: columnDefs,
    data: tableData,
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable table={table}>
      <DataTableBody />
    </DataTable>
  );
};

ProteusDataTable.displayName = "@optiaxiom/react/ProteusDataTable";
