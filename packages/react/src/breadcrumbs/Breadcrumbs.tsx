import { type ReactNode, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { IconAngleRight } from "../icons/IconAngleRight";
import { extractSprinkles } from "../sprinkles";
import { useBreadcrumbItems } from "./useBreadcrumbItems";

export type BreadcrumbsProps = BoxProps<
  "nav",
  {
    maxItems?: number;
    separator?: ReactNode;
  }
>;

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, maxItems, separator = <IconAngleRight />, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const visibleItems = useBreadcrumbItems(children, maxItems, separator);

    return (
      <Box asChild {...sprinkleProps}>
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <Box alignItems="center" asChild display="flex" gap="xs">
            <ol>{visibleItems}</ol>
          </Box>
        </nav>
      </Box>
    );
  },
);

Breadcrumbs.displayName = "@optiaxiom/react/Breadcrumbs";
