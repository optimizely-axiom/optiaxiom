import {
  Children,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
} from "react";

import * as styles from "../breadcrumb/Breadcrumb.css";
import { BreadcrumbItem } from "../breadcrumb-item/BreadcrumbItem";
import { Menu } from "../menu";
import { MenuContent } from "../menu-content";
import { MenuItem } from "../menu-item";
import { MenuTrigger } from "../menu-trigger";
import { Text } from "../text";

type UseBreadcrumbItemsProps = {
  children: ReactNode;
  maxItems: number;
  separator: ReactNode;
};

export const useBreadcrumbItems = ({
  children,
  maxItems,
  separator,
}: UseBreadcrumbItemsProps) => {
  const childrenArray = Children.toArray(children).filter(
    (child): child is ReactElement =>
      isValidElement(child) && child.type === BreadcrumbItem,
  );

  const visibleItems = useMemo(() => {
    if (!maxItems || childrenArray.length <= maxItems) {
      return childrenArray.map((item) => cloneElement(item));
    }

    const leftItems = Math.floor(maxItems / 2);
    const rightItems = Math.ceil(maxItems / 2);

    const leftChildren = childrenArray
      .slice(0, leftItems)
      .map((item) => cloneElement(item));
    const rightChildren = childrenArray
      .slice(childrenArray.length - rightItems)
      .map((item) => cloneElement(item));

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
              {cloneElement(item)}
            </MenuItem>
          ))}
        </MenuContent>
      </Menu>,
      ...rightChildren,
    ];
  }, [childrenArray, maxItems]);

  return visibleItems.reduce((acc: ReactNode[], item, index) => {
    if (index !== 0) {
      acc.push(separator);
    }
    acc.push(item);
    return acc;
  }, []);
};
