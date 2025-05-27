import { forwardRef, useState } from "react";

import type { BoxProps } from "../box";

import { TableRow } from "../table";
import { isFocusCaptured } from "../utils";
import { useDataTableContext } from "./DataTableContext";
import { DataTableRowProvider, fakeRow } from "./DataTableRowContext";

export type DataTableRowProps = BoxProps<
  typeof TableRow,
  {
    /**
     * The Row instance to render.
     */
    row: ReturnType<typeof fakeRow>;
  }
>;

export const DataTableRow = forwardRef<HTMLTableRowElement, DataTableRowProps>(
  ({ children, row, ...props }, ref) => {
    const { table } = useDataTableContext("@optiaxiom/react/DataTableRow");

    const [selectionMode, setSelectionMode] = useState<"single" | false>(false);

    return (
      <TableRow
        onPointerUp={(event) => {
          if (!selectionMode || isFocusCaptured(event)) {
            return;
          }

          table.setRowSelection({ [row.id]: true });
        }}
        ref={ref}
        {...props}
      >
        <DataTableRowProvider row={row} setSelectionMode={setSelectionMode}>
          {children}
        </DataTableRowProvider>
      </TableRow>
    );
  },
);

DataTableRow.displayName = "@optiaxiom/react/DataTableRow";
