import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Breadcrumbs.css";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type BreadcrumbsProps = BoxProps<
  "nav",
  {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
  } & styles.BreadcrumbsVariants
>;

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      colorScheme = "primary",
      items,
      separator = "/",
      size,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        {...styles.breadcrumbs({ colorScheme, size }, className)}
        {...sprinkleProps}
      >
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <ol {...styles.breadcrumbs()}>
            {items.map((item, index) => (
              <li {...styles.breadcrumbItem()} key={item.href}>
                {index < items.length - 1 ? (
                  <>
                    <Box asChild {...styles.link()}>
                      <a href={item.href}>{item.label}</a>
                    </Box>
                    <Box asChild {...styles.separator()}>
                      <span aria-hidden="true">{separator}</span>
                    </Box>
                  </>
                ) : (
                  <Box asChild {...styles.currentPage()}>
                    <span aria-current="page">{item.label}</span>
                  </Box>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Box>
    );
  },
);

Breadcrumbs.displayName = "@optiaxiom/react/Breadcrumbs";
