import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { get } from "jsonpointer";

import { DataTable } from "../data-table/DataTable";
import { DataTableBody } from "../data-table/DataTableBody";
import { applyFormatter } from "./getProteusValue";

type ColumnDef = {
  accessorKey: string;
  format?: string | { options?: Record<string, unknown>; type: string };
  header: string;
  size?: number;
};

export const ProteusDataTable = ({
  columns,
  data,
}: {
  columns: ColumnDef[];
  data?: Record<string, unknown>[];
}) => {
  const tableData = data as Record<string, unknown>[];

  const columnHelper = createColumnHelper<Record<string, unknown>>();
  const columnDefs = columns.map((col) => {
    return columnHelper.accessor(
      (row) => {
        const value = get(row, "/" + col.accessorKey);
        return col.format ? String(applyFormatter(value, col.format)) : value;
      },
      {
        header: col.header,
        id: col.accessorKey,
        size: col.size,
      },
    );
  });

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
