import React from "react";

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
  isEllipsis = false,
  isLast = false,
  label,
  separator = ">",
}) => (
  <li {...styles.breadcrumbItem()}>
    <Text as="span" {...styles.link({ isEllipsis })}>
      <a href={href}>{label}</a>
    </Text>
    {!isLast && (
      <Text as="span" {...styles.separator()}>
        <span aria-hidden="true">{separator}</span>
      </Text>
    )}
  </li>
);
