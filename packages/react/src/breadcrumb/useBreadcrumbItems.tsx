import React, {
  Children,
  type ReactElement,
  cloneElement,
  isValidElement,
  useMemo,
} from "react";

import {
  BreadcrumbItem,
  type BreadcrumbItemProps,
} from "../breadcrumb-item/BreadcrumbItem";
import { Menu } from "../menu";
import { MenuContent } from "../menu-content";
import { MenuItem } from "../menu-item";
import { MenuTrigger } from "../menu-trigger";
import { Text } from "../text";
import * as styles from "./Breadcrumb.css";

type UseBreadcrumbItemsProps = {
  children: React.ReactNode;
  maxItems: number;
  separator: React.ReactNode;
};

export const useBreadcrumbItems = ({
  children,
  maxItems,
  separator,
}: UseBreadcrumbItemsProps) => {
  const childrenArray = Children.toArray(children).filter(
    (child): child is ReactElement<BreadcrumbItemProps> =>
      isValidElement(child) && child.type === BreadcrumbItem,
  );

  const visibleItems = useMemo(() => {
    if (!maxItems || childrenArray.length <= maxItems) {
      return childrenArray.map((item, index) =>
        cloneElement(item, {
          followingSeparator: index !== childrenArray.length - 1,
          precedingSeparator: false,
          separator,
        }),
      );
    }

    const leftItems = Math.floor(maxItems / 2);
    const rightItems = Math.ceil(maxItems / 2);

    const leftChildren = childrenArray.slice(0, leftItems).map((item) =>
      cloneElement(item, {
        followingSeparator: true,
        precedingSeparator: false,
        separator,
      }),
    );

    const rightChildren = childrenArray
      .slice(childrenArray.length - rightItems)
      .map((item) =>
        cloneElement(item, {
          followingSeparator: false,
          precedingSeparator: true,
          separator,
        }),
      );

    return [
      ...leftChildren,
      <Menu key="ellipsis">
        <MenuTrigger asChild>
          <Text as="span" {...styles.ellipsis()}>
            ...
          </Text>
        </MenuTrigger>
        <MenuContent side="bottom">
          {childrenArray.slice(leftItems, -rightItems).map((item, index) => (
            <MenuItem key={item.props.href || index}>
              {cloneElement(item, {
                followingSeparator: false,
                precedingSeparator: false,
                separator,
              })}
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>,
      ...rightChildren,
    ];
  }, [childrenArray, maxItems, separator]);

  return visibleItems;
};
