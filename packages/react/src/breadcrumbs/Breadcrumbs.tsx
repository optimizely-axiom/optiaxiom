import React, { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import * as styles from "./Breadcrumbs.css";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type BreadcrumbsProps = BoxProps<
  "nav",
  {
    items: BreadcrumbItem[];
    maxItems?: number;
    separator?: React.ReactNode;
  } & styles.BreadcrumbsVariants
>;

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      colorScheme = "primary",
      items,
      maxItems = Infinity,
      separator = ">",
      size = "medium",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const itemsCount = items.length;
    const shouldTruncate = maxItems < itemsCount && maxItems > 1;

    let displayedItems: React.ReactNode[];
    if (shouldTruncate) {
      const firstItem = items[0];
      const lastItem = items[itemsCount - 1];
      displayedItems = [
        <React.Fragment key={firstItem.href}>
          <Text as="span" {...styles.link()}>
            <a href={firstItem.href}>{firstItem.label}</a>
          </Text>
        </React.Fragment>,
        <React.Fragment key="ellipsis">
          <Text as="span" {...styles.separator()}>
            <span aria-hidden="true">{separator}</span>
          </Text>
          <Text as="span" {...styles.ellipsis()}>
            ...
          </Text>
        </React.Fragment>,
        <React.Fragment key={lastItem.href}>
          <Text as="span" {...styles.separator()}>
            <span aria-hidden="true">{separator}</span>
          </Text>
          <Text as="span" {...styles.link()}>
            <a href={lastItem.href}>{lastItem.label}</a>
          </Text>
        </React.Fragment>,
      ];
    } else {
      displayedItems = items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <Text as="span" {...styles.separator()}>
              <span aria-hidden="true">{separator}</span>
            </Text>
          )}
          <Text as="span" {...styles.link()}>
            <a href={item.href}>{item.label}</a>
          </Text>
        </React.Fragment>
      ));
    }

    return (
      <Box
        asChild
        {...styles.breadcrumbs({ colorScheme, size }, className)}
        {...sprinkleProps}
      >
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <ol {...styles.breadcrumbsList()}>
            {displayedItems.map((item, index) => (
              <li {...styles.breadcrumbItem()} key={index}>
                {item}
              </li>
            ))}
          </ol>
        </nav>
      </Box>
    );
  },
);

Breadcrumbs.displayName = "@optiaxiom/react/Breadcrumbs";
