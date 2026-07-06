import { DataTable, DataTableBody } from "@optiaxiom/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { get } from "jsonpointer";
import { type ReactNode } from "react";

import { applyFormatter } from "../proteus-document/getProteusValue";

export type ProteusDataTableProps = {
  /**
   * Column definitions
   */
  columns?: ColumnDef[];
  /**
   * Column data
   */
  data?: Record<string, unknown>[];
};

type ColumnDef = {
  accessorKey: string;
  /**
   * Renders a cell for this column from the row's data. When set, takes
   * precedence over `format`. Wired up from a Proteus `cell` template by
   * `ProteusElement`.
   */
  cell?: (row: Record<string, unknown>) => ReactNode;
  format?: string | { options?: Record<string, unknown>; type: string };
  header: string;
  size?: number;
};

export const ProteusDataTable = ({ columns, data }: ProteusDataTableProps) => {
  const tableData = data as Record<string, unknown>[];

  const columnHelper = createColumnHelper<Record<string, unknown>>();
  const columnDefs = (columns || []).map((col) => {
    return columnHelper.accessor(
      (row) => {
        const value = get(row, "/" + col.accessorKey);
        return col.format ? String(applyFormatter(value, col.format)) : value;
      },
      {
        header: col.header,
        id: col.accessorKey,
        size: col.size,
        ...(col.cell && {
          cell: ({ row }) => col.cell?.(row.original),
        }),
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

ProteusDataTable.displayName = "@optiaxiom/proteus/ProteusDataTable";
