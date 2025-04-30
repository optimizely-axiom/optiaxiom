import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Link } from "../link";
import * as styles from "./BreadcrumbLink.css";

export type BreadcrumbLinkProps = BoxProps<typeof Link>;

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ className, ...props }, ref) => {
  return <Link {...styles.link({}, className)} ref={ref} {...props} />;
});
BreadcrumbLink.displayName = "@optiaxiom/react/BreadcrumbLink";
