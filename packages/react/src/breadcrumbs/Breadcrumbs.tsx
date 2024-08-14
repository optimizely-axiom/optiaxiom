import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Breadcrumbs.css";
import { useBreadcrumbItems } from "./useBreadcrumbItems";

export type BreadcrumbsProps = BoxProps<
  "nav",
  {
    maxItems?: number;
    separator?: ReactNode;
  }
>;

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
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
      <Box asChild {...styles.breadcrumbs({}, className)} {...sprinkleProps}>
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <Box asChild {...styles.list()}>
            <ol>{visibleItems}</ol>
          </Box>
        </nav>
      </Box>
    );
  },
);

Breadcrumbs.displayName = "@optiaxiom/react/Breadcrumbs";
