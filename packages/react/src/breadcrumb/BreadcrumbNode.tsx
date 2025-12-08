import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Group } from "../group";
import { fallbackSpan } from "../utils";
import * as styles from "./BreadcrumbNode.css";

export type BreadcrumbNodeProps = BoxProps<
  "li",
  {
    /**
     * Display content inside the item after the label.
     */
    addonAfter?: ReactNode;
  }
>;

export const BreadcrumbNode = forwardRef<HTMLLIElement, BreadcrumbNodeProps>(
  ({ addonAfter, children, className, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.item({}, className)} {...boxProps}>
        <li ref={ref} {...restProps}>
          {children}
          {addonAfter && (
            <Group asChild flex="none" gap="4">
              {fallbackSpan(addonAfter)}
            </Group>
          )}
        </li>
      </Box>
    );
  },
);

BreadcrumbNode.displayName = "@optiaxiom/react/BreadcrumbNode";
