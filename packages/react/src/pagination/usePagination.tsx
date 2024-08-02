import { type ComponentPropsWithRef } from "react";

import type { PaginationButton } from "../pagination-button/PaginationButton";

const DOTS = "...";

export const usePagination = (
  offset: number,
  total: number,
  pageSize: number,
  siblingCount: number = 1,
  boundaries: number = 1,
) => {
  const activePage = Math.floor(offset / pageSize) + 1;
  const _total = Math.ceil(total / pageSize);

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = (): (number | typeof DOTS)[] => {
    const totalPageNumbers = siblingCount * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= _total) {
      return range(1, _total);
    }

    const leftSiblingIndex = Math.max(activePage - siblingCount, boundaries);
    const rightSiblingIndex = Math.min(
      activePage + siblingCount,
      _total - boundaries,
    );

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblingCount * 2 + boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(_total - (boundaries - 1), _total),
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblingCount;
      return [
        ...range(1, boundaries),
        DOTS,
        ...range(_total - rightItemCount, _total),
      ];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_total - boundaries + 1, _total),
    ];
  };

  const pageRange = paginationRange();

  const buttons: Array<
    {
      children: string;
      value?: number | string;
    } & Pick<
      ComponentPropsWithRef<typeof PaginationButton>,
      "active" | "className" | "disabled" | "iconPosition"
    >
  > = pageRange.map((pageNumber) => ({
    active: pageNumber === activePage ? true : false,
    children: pageNumber === DOTS ? DOTS : String(pageNumber),
    disabled: pageNumber === DOTS,
    value: pageNumber === DOTS ? undefined : pageNumber,
  }));

  const next = () => Math.min(activePage + 1, _total);
  const previous = () => Math.max(activePage - 1, 1);

  return { active: activePage, buttons, next, previous, totalPage: _total };
};
