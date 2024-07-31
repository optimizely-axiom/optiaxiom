import { Pagination as PaginationComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Pagination = "ax-pagination";
register(Pagination, PaginationComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Pagination]: ComponentAttributes<typeof PaginationComponent>;
    }
  }
}
