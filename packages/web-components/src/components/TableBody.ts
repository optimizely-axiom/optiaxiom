import { TableBody as TableBodyComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const TableBody = "ax-table-body";
register(TableBody, TableBodyComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TableBody]: ComponentAttributes<typeof TableBodyComponent>;
    }
  }
}
