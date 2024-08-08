import { Table as TableComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Table = "ax-table";
register(Table, TableComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Table]: ComponentAttributes<typeof TableComponent>;
    }
  }
}
