import type { ReactNode } from "react";

import { Slot } from "@radix-ui/react-slot";

import { Link } from "../link";
import * as styles from "./BreadcrumbItem.css";

export type BreadcrumbItemProps = {
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
  href?: string;
  isEllipsis?: boolean;
  label: string;
};

export const BreadcrumbItem = ({
  asChild,
  className,
  label,
  ...props
}: BreadcrumbItemProps) => {
  const Comp = asChild ? Slot : Link;
  return (
    <Comp {...styles.breadcrumbItem({}, className)} {...props}>
      {label}
    </Comp>
  );
};
