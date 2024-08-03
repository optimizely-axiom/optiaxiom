import { Breadcrumbs as BreadcrumbsComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const Breadcrumbs = "ax-button";
register(Breadcrumbs, BreadcrumbsComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [Breadcrumbs]: ComponentAttributes<typeof BreadcrumbsComponent>;
    }
  }
}
