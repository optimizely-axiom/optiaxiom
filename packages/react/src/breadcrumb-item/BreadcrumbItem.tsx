import React from "react";

import { Link } from "../link";
import { Text } from "../text";
import * as styles from "./BreadcrumbItem.css";

export type BreadcrumbItemProps = {
  followingSeparator?: boolean;
  href: string;
  isEllipsis?: boolean;
  label: string;
  onClick?: () => void;
  precedingSeparator?: boolean;
  separator?: React.ReactNode;
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  followingSeparator = false,
  href,
  isEllipsis = false,
  label,
  onClick,
  precedingSeparator = true,
  separator = ">",
}) => (
  <li {...styles.breadcrumbItem()}>
    {precedingSeparator && (
      <Text as="span" {...styles.separator()}>
        {separator}
      </Text>
    )}
    {href === "#" && isEllipsis ? (
      <Text as="span" onClick={onClick}>
        {label}
      </Text>
    ) : (
      <Text as="span">
        <Link href={href}>{label}</Link>
      </Text>
    )}
    {followingSeparator && (
      <Text as="span" {...styles.separator()}>
        {separator}
      </Text>
    )}
  </li>
);
