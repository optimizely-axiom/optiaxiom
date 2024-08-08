import { TableRow as TableRowComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const TableRow = "ax-table-row";
register(TableRow, TableRowComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TableRow]: ComponentAttributes<typeof TableRowComponent>;
    }
  }
}
