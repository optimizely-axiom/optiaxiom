import React, { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Breadcrumb.css";
import { useBreadcrumbItems } from "./useBreadcrumbItems";

export type BreadcrumbProps = BoxProps<
  "nav",
  {
    children: React.ReactNode;
    maxItems?: number;
    separator?: React.ReactNode;
  }
>;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { children, className, maxItems = Infinity, separator = ">", ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const visibleItems = useBreadcrumbItems({
      children,
      maxItems,
      separator,
    });

    return (
      <Box asChild {...styles.breadcrumb({}, className)} {...sprinkleProps}>
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <ol {...styles.breadcrumbList()}>{visibleItems}</ol>
        </nav>
      </Box>
    );
  },
);

Breadcrumb.displayName = "@optiaxiom/react/Breadcrumb";
