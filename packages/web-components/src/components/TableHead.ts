import { TableHead as TableHeadComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const TableHead = "ax-table-head";
register(TableHead, TableHeadComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [TableHead]: ComponentAttributes<typeof TableHeadComponent>;
    }
  }
}
