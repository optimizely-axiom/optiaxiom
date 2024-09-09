import { Children, type ReactNode, isValidElement, useMemo } from "react";

import { BreadcrumbItem } from "../breadcrumb-item/BreadcrumbItem";
import { DropdownMenu } from "../dropdown-menu";
import { DropdownMenuContent } from "../dropdown-menu-content";
import { DropdownMenuItem } from "../dropdown-menu-item";
import { DropdownMenuTrigger } from "../dropdown-menu-trigger";

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

      <DropdownMenu key="ellipsis">
        <DropdownMenuTrigger appearance="secondary" icon={undefined} size="sm">
          ...
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom">
          {childrenArray.slice(leftItems, -rightItems).map((item, index) => (
            <DropdownMenuItem key={item.props.href || index}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>,

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
