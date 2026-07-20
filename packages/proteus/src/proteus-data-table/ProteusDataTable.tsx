import {
  Cover,
  DataTable,
  DataTableBody,
  DataTableCheckbox,
} from "@optiaxiom/react";
import {
  createColumnHelper,
  getCoreRowModel,
  type RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { get } from "jsonpointer";
import { type ReactNode, useMemo } from "react";

import { applyFormatter } from "../proteus-document/getProteusValue";
import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
import { useProteusValue } from "../use-proteus-value";

export type ProteusDataTableProps = {
  /**
   * Column definitions
   */
  columns?: ColumnDef[];
  /**
   * Column data
   */
  data?: Record<string, unknown>[];
  /**
   * JSON pointer where the selected rows are stored (e.g. `/selection`). When
   * set, the table renders a select-all header checkbox and a per-row checkbox
   * column, and writes the selected row objects as an array to this pointer so
   * an action can read them via `Value`.
   */
  rowSelection?: string;
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

export const ProteusDataTable = ({
  columns,
  data,
  rowSelection,
}: ProteusDataTableProps) => {
  const { onDataChange, readOnly } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusDataTable",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusDataTable",
  );

  const tableData = (data ?? []) as Record<string, unknown>[];

  const columnHelper = createColumnHelper<Record<string, unknown>>();
  const columnDefs = useMemo(() => {
    const defs = (columns || []).map((col) => {
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

    if (rowSelection === undefined) {
      return defs;
    }

    return [
      columnHelper.display({
        cell: () => (
          <Cover asChild>
            <DataTableCheckbox disabled={readOnly} />
          </Cover>
        ),
        header: () => (
          <Cover asChild>
            <DataTableCheckbox disabled={readOnly} />
          </Cover>
        ),
        id: "select",
        size: 20,
      }),
      ...defs,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, rowSelection, readOnly]);

  // Bridge the stored array of selected rows to/from TanStack's index-keyed
  // `rowSelection` state.
  const selectedRows = useProteusValue({ path: rowSelection ?? "" });
  const selectedSerialized = JSON.stringify(
    Array.isArray(selectedRows) ? selectedRows : [],
  );
  const rowSelectionState = useMemo<RowSelectionState>(() => {
    if (rowSelection === undefined) {
      return {};
    }
    const selected = JSON.parse(selectedSerialized) as Record<
      string,
      unknown
    >[];
    const selectedKeys = new Set(selected.map((row) => JSON.stringify(row)));
    const state: RowSelectionState = {};
    tableData.forEach((row, index) => {
      if (selectedKeys.has(JSON.stringify(row))) {
        state[index] = true;
      }
    });
    return state;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection, selectedSerialized, JSON.stringify(tableData)]);

  const resolvedSelectionPath =
    rowSelection === undefined
      ? undefined
      : rowSelection.startsWith("/")
        ? rowSelection
        : `${parentPath}/${rowSelection}`;

  const table = useReactTable({
    columns: columnDefs,
    data: tableData,
    enableRowSelection: rowSelection !== undefined && !readOnly,
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
    ...(rowSelection !== undefined && {
      onRowSelectionChange: (updater) => {
        const next =
          typeof updater === "function" ? updater(rowSelectionState) : updater;
        const rows = tableData.filter((_, index) => next[index]);
        if (resolvedSelectionPath) {
          onDataChange?.(resolvedSelectionPath, rows);
        }
      },
      state: { rowSelection: rowSelectionState },
    }),
  });

  return (
    <DataTable maxH="md" table={table}>
      <DataTableBody />
    </DataTable>
  );
};

ProteusDataTable.displayName = "@optiaxiom/proteus/ProteusDataTable";
