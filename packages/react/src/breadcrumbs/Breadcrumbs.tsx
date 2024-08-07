import React, { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import {
  BreadcrumbItem,
  type BreadcrumbItemProps,
} from "../breadcrumbs-item/BreadcrumbsItem";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Breadcrumbs.css";

export type BreadcrumbsProps = BoxProps<
  "nav",
  {
    children?: React.ReactNode;
    items?: Omit<BreadcrumbItemProps, "isLast" | "separator">[];
    maxItems?: number;
    separator?: React.ReactNode;
  } & styles.BreadcrumbsVariants
>;

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      children,
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

    const displayedItems = React.useMemo(() => {
      if (children) {
        return React.Children.toArray(children).map((child, index, array) => {
          if (
            React.isValidElement<BreadcrumbItemProps>(child) &&
            child.type === BreadcrumbItem
          ) {
            return React.cloneElement(child, {
              ...child.props,
              isLast: index === array.length - 1,
              separator,
            });
          }
          return child;
        });
      }

      if (!items) return null;

      if (items.length <= maxItems || maxItems <= 1) {
        return items.map((item, index) => (
          <BreadcrumbItem
            {...item}
            isLast={index === items.length - 1}
            key={item.href}
            separator={separator}
          />
        ));
      }

      return [
        <BreadcrumbItem
          {...items[0]}
          isLast={false}
          key={items[0].href}
          separator={separator}
        />,
        <BreadcrumbItem
          href="#"
          isEllipsis
          isLast={false}
          key="ellipsis"
          label="..."
          separator={separator}
        />,
        <BreadcrumbItem
          {...items[items.length - 1]}
          isLast
          key={items[items.length - 1].href}
          separator={separator}
        />,
      ];
    }, [items, maxItems, separator, children]);

    return (
      <Box
        asChild
        {...styles.breadcrumbs({ colorScheme, size }, className)}
        {...sprinkleProps}
      >
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <ol {...styles.breadcrumbsList()}>{displayedItems}</ol>
        </nav>
      </Box>
    );
  },
);

Breadcrumbs.displayName = "@optiaxiom/react/Breadcrumbs";
