import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

export type BreadcrumbProps = BoxProps<"nav">;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, className, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild className={className} {...sprinkleProps}>
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <Box alignItems="center" asChild display="flex" gap="8">
            <ol>{children}</ol>
          </Box>
        </nav>
      </Box>
    );
  },
);

Breadcrumb.displayName = "@optiaxiom/react/Breadcrumb";
