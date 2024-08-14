import type { ComponentPropsWithoutRef } from "react";

import { Link } from "../link";

export type BreadcrumbItemProps = ComponentPropsWithoutRef<typeof Link>;

export const BreadcrumbItem = ({ children, ...props }: BreadcrumbItemProps) => {
  return (
    <Link alignItems="center" display="flex" {...props}>
      {children}
    </Link>
  );
};
