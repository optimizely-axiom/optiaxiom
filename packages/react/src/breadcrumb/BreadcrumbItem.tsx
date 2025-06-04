import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Flex } from "../flex";
import { fallbackSpan } from "../utils";
import * as styles from "./BreadcrumbItem.css";

export type BreadcrumbItemProps = BoxProps<
  "li",
  {
    /**
     * Display content inside the item after the label.
     */
    addonAfter?: ReactNode;
  }
>;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ addonAfter, children, className, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.item({}, className)} {...boxProps}>
        <li ref={ref} {...restProps}>
          {children}
          {addonAfter && (
            <Flex asChild flex="none" flexDirection="row" gap="4">
              {fallbackSpan(addonAfter)}
            </Flex>
          )}
        </li>
      </Box>
    );
  },
);

BreadcrumbItem.displayName = "@optiaxiom/react/BreadcrumbItem";
