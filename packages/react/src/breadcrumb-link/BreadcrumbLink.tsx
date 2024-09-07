import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Link } from "../link";

export type BreadcrumbLinkProps = BoxProps<typeof Link>;

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : Link;

  return <Comp ref={ref} {...props} />;
});
BreadcrumbLink.displayName = "@optiaxiom/react/BreadcrumbLink";
