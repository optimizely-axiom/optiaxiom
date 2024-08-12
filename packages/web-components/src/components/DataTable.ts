import { DataTable as DataTableComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const DataTable = "ax-data-table";
register(DataTable, DataTableComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [DataTable]: ComponentAttributes<typeof DataTableComponent>;
    }
  }
}
