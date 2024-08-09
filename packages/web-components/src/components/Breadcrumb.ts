import { Breadcrumb as BreadcrumbComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Breadcrumb = "ax-breadcrumb";
register(Breadcrumb, BreadcrumbComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Breadcrumb]: ComponentAttributes<typeof BreadcrumbComponent>;
    }
  }
}
