import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Link } from "../link";
import * as styles from "./BreadcrumbLink.css";

export type BreadcrumbLinkProps = BoxProps<typeof Link>;

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : Link;

  return <Comp {...styles.link({}, className)} ref={ref} {...props} />;
});
BreadcrumbLink.displayName = "@optiaxiom/react/BreadcrumbLink";
