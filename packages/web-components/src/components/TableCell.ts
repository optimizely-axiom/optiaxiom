import { TableCell as TableCellComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const TableCell = "ax-table-cell";
register(TableCell, TableCellComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TableCell]: ComponentAttributes<typeof TableCellComponent>;
    }
  }
}
