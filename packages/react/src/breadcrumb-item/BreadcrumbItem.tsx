import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";

export type BreadcrumbItemProps = BoxProps<"li">;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box alignItems="center" asChild display="inline-flex" {...sprinkleProps}>
        <li ref={ref} {...restProps}>
          {children}
        </li>
      </Box>
    );
  },
);

BreadcrumbItem.displayName = "@optiaxiom/react/BreadcrumbItem";
