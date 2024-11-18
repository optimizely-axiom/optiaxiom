import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./BreadcrumbItem.css";

export type BreadcrumbItemProps = BoxProps<"li">;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box asChild {...styles.item()} {...sprinkleProps}>
        <li ref={ref} {...restProps}>
          {children}
        </li>
      </Box>
    );
  },
);

BreadcrumbItem.displayName = "@optiaxiom/react/BreadcrumbItem";
