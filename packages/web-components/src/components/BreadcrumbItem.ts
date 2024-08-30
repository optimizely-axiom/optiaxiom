import { BreadcrumbItem as BreadcrumbItemComponent } from "@optiaxiom/react";

import type { ComponentAttributes } from "./ComponentAttributes";

import { register } from "../register";

export const BreadcrumbItem = "ax-breadcrumb-item";
export default register(BreadcrumbItem, BreadcrumbItemComponent);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [BreadcrumbItem]: ComponentAttributes<typeof BreadcrumbItemComponent>;
    }
  }
}
