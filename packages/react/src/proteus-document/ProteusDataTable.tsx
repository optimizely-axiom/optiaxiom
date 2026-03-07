import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTable } from "../data-table/DataTable";
import { DataTableBody } from "../data-table/DataTableBody";

export const ProteusDataTable = ({
  columns,
  data,
}: {
  columns: { accessorKey: string; header: string }[];
  data?: Record<string, unknown>[];
}) => {
  const tableData = data as Record<string, unknown>[];

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
    <DataTable maxH="md" table={table}>
      <DataTableBody />
    </DataTable>
  );
};

ProteusDataTable.displayName = "@optiaxiom/react/ProteusDataTable";
