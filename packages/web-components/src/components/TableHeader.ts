import { TableHeader as TableHeaderComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const TableHeader = "ax-table-header";
register(TableHeader, TableHeaderComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TableHeader]: ComponentAttributes<typeof TableHeaderComponent>;
    }
  }
}
