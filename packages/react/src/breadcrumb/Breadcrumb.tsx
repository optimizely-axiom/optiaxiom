import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Breadcrumb.css";
import { useBreadcrumbItems } from "./useBreadcrumbItems";

export type BreadcrumbProps = BoxProps<
  "nav",
  {
    maxItems?: number;
    separator?: ReactNode;
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

    visibleItems.join(String(separator));

    return (
      <Box asChild {...styles.breadcrumb({}, className)} {...sprinkleProps}>
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <Box asChild {...styles.breadcrumbList()}>
            <ol>{visibleItems}</ol>
          </Box>
        </nav>
      </Box>
    );
  },
);

Breadcrumb.displayName = "@optiaxiom/react/Breadcrumb";
