import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

export type BreadcrumbsProps = BoxProps<"nav">;
/* 
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
*/

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    // const visibleItems = useBreadcrumbItems(children, maxItems, separator);

    return (
      <Box asChild {...sprinkleProps}>
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <Box alignItems="center" asChild display="flex" gap="xs">
            <ol>{children}</ol>
          </Box>
        </nav>
      </Box>
    );
  },
);

Breadcrumbs.displayName = "@optiaxiom/react/Breadcrumbs";
