import { forwardRef, Fragment, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { IconEllipsisSolid } from "../icons/IconEllipsisSolid";
import { Link } from "../link";
import { Menu, MenuContent, MenuTrigger } from "../menu";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import * as styles from "./Breadcrumb.css";
import { BreadcrumbNode } from "./BreadcrumbNode";

export type BreadcrumbProps = BoxProps<
  "nav",
  {
    /**
     * The items we want to render.
     */
    items: Array<{
      /**
       * Display content inside the item after the label.
       */
      addonAfter?: ReactNode;
      /**
       * Handler that is called when an item is selected either via keyboard or mouse.
       */
      execute?: () => void;
      /**
       * Render a link with the given value as the `href` attribute.
       */
      href?: string;
      /**
       * The content of the item.
       */
      label: string;
    }>;
    /**
     * The maximum number of breadcrumb items to show before truncating.
     */
    maxItems?: number;
  }
>;

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, maxItems = 3, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild className={className} {...boxProps}>
        <nav aria-label="Breadcrumb" ref={ref} {...restProps}>
          <Box asChild {...styles.list()}>
            <ol>
              {renderItems(items, maxItems, (item, index) => (
                <BreadcrumbNode addonAfter={item.addonAfter}>
                  <Tooltip auto content={item.label}>
                    <Text asChild truncate>
                      {index === items.length - 1 ? (
                        <Box
                          aria-current={
                            index === items.length - 1 ? "page" : undefined
                          }
                        >
                          {item.label}
                        </Box>
                      ) : item.href ? (
                        <Link
                          appearance="subtle"
                          href={item.href}
                          {...styles.link()}
                        >
                          {item.label}
                        </Link>
                      ) : item.execute ? (
                        <Link appearance="subtle" asChild {...styles.link()}>
                          <button onClick={() => item.execute?.()}>
                            {item.label}
                          </button>
                        </Link>
                      ) : null}
                    </Text>
                  </Tooltip>
                </BreadcrumbNode>
              ))}
            </ol>
          </Box>
        </nav>
      </Box>
    );
  },
);

Breadcrumb.displayName = "@optiaxiom/react/Breadcrumb";

const renderItems = (
  items: BreadcrumbProps["items"],
  limit = items.length,
  renderItem: (
    item: BreadcrumbProps["items"][number],
    index: number,
  ) => ReactNode,
) => {
  if (limit < 0) {
    limit = 0;
  }
  if (limit > items.length || typeof limit !== "number") {
    limit = items.length;
  }

  const boundaries = [
    0,
    Math.floor(limit / 2),
    items.length - Math.ceil(limit / 2),
    items.length,
  ];
  return [
    ...items
      .slice(boundaries[0], boundaries[1])
      .map((item, index) => (
        <Fragment key={"left" + index}>{renderItem(item, index)}</Fragment>
      )),
    boundaries[2] > boundaries[1] && (
      <BreadcrumbNode key="ellipsis">
        <Menu options={items.slice(boundaries[1], boundaries[2])}>
          <MenuTrigger
            appearance="subtle"
            aria-label="More items"
            icon={
              <Box asChild color="fg.tertiary">
                <IconEllipsisSolid />
              </Box>
            }
          />
          <MenuContent />
        </Menu>
      </BreadcrumbNode>
    ),
    ...items
      .slice(boundaries[2], boundaries[3])
      .map((item, index) => (
        <Fragment key={"right" + index}>
          {renderItem(item, boundaries[2] + index)}
        </Fragment>
      )),
  ];
};
