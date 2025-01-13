import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./BreadcrumbItem.css";

export type BreadcrumbItemProps = BoxProps<"li">;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, className, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.item({}, className)} {...boxProps}>
        <li ref={ref} {...restProps}>
          {children}
        </li>
      </Box>
    );
  },
);

BreadcrumbItem.displayName = "@optiaxiom/react/BreadcrumbItem";
