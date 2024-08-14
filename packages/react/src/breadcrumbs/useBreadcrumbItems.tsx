import { Children, type ReactNode, isValidElement, useMemo } from "react";

import { BreadcrumbItem } from "../breadcrumb-item/BreadcrumbItem";
import { Menu } from "../menu";
import { MenuContent } from "../menu-content";
import { MenuItem } from "../menu-item";
import { MenuTrigger } from "../menu-trigger";

export const useBreadcrumbItems = (
  children: ReactNode,
  maxItems: number | undefined,
  separator: ReactNode,
) => {
  const visibleItems = useMemo(() => {
    const childrenArray = Children.toArray(children)
      .filter((child) => isValidElement(child))
      .filter((child) => child.type === BreadcrumbItem);

    if (!maxItems || childrenArray.length <= maxItems) {
      return childrenArray;
    }

    const leftItems = Math.floor(maxItems / 2);
    const rightItems = Math.ceil(maxItems / 2);

    return [
      ...childrenArray.slice(0, leftItems),

      <Menu key="ellipsis">
        <MenuTrigger appearance="secondary" icon={undefined} size="sm">
          ...
        </MenuTrigger>

        <MenuContent side="bottom">
          {childrenArray.slice(leftItems, -rightItems).map((item, index) => (
            <MenuItem key={item.props.href || index}>{item}</MenuItem>
          ))}
        </MenuContent>
      </Menu>,

      ...childrenArray.slice(childrenArray.length - rightItems),
    ];
  }, [children, maxItems]);

  return visibleItems.reduce<ReactNode[]>((acc, item, index) => {
    if (index !== 0) {
      acc.push(separator);
    }
    acc.push(item);
    return acc;
  }, []);
};
