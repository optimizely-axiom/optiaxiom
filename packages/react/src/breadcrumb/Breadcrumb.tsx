import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

export type BreadcrumbProps = BoxProps<"nav">;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

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

Breadcrumb.displayName = "@optiaxiom/react/Breadcrumb";
