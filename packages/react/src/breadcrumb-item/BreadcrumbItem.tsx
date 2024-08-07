import React from "react";

import { Link } from "../link";
import { Text } from "../text";
import * as styles from "./BreadcrumbItem.css";

export type BreadcrumbItemProps = {
  href: string;
  isEllipsis?: boolean;
  isLast?: boolean;
  label: string;
  separator?: React.ReactNode;
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,

  isLast = false,
  label,
  separator = ">",
}) => (
  <li {...styles.breadcrumbItem()}>
    <Text as="span">
      <Link href={href}>{label}</Link>
    </Text>
    {!isLast && (
      <Text as="span" {...styles.separator()}>
        {separator}
      </Text>
    )}
  </li>
);
