import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Flex } from "../flex";
import { Link } from "../link";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { fallbackSpan } from "../utils";
import * as styles from "./BreadcrumbItem.css";

export type BreadcrumbItemProps = BoxProps<
  "li",
  {
    /**
     * Display content inside the item after the label.
     */
    addonAfter?: ReactNode;
    /**
     * Whether the item is the current page.
     */
    current?: boolean;
    /**
     * Render a link with the given value as the `href` attribute.
     */
    href?: string;
  }
>;

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ addonAfter, children, className, current, href, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.item({}, className)} {...boxProps}>
        <li ref={ref} {...restProps}>
          <Tooltip auto content={children}>
            <Text asChild truncate>
              {current || !href ? (
                <Box aria-current={current ? "page" : undefined}>
                  {children}
                </Box>
              ) : (
                <Link appearance="subtle" href={href} {...styles.link()}>
                  {children}
                </Link>
              )}
            </Text>
          </Tooltip>

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
