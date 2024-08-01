import type { ComponentPropsWithRef } from "react";

import type { Button } from "../button";

const DOTS = "...";

export const usePagination = (
  offset: number,
  total: number,
  pageSize: number,
  siblingCount: number = 1,
) => {
  const currentPage = Math.floor(offset / pageSize) + 1;
  const totalPage = Math.ceil(total / pageSize);

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = (): (number | typeof DOTS)[] => {
    const totalPageNumbers = siblingCount * 2 + 5; // 5 = first + last + current + 2 DOTS

    if (totalPageNumbers >= totalPage) {
      return range(1, totalPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPage - rightItemCount + 1, totalPage);
      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPage];
    }
    return range(1, totalPage);
  };

  const pageRange = paginationRange();

  const buttons: Array<
    {
      children: string;
      value?: number | string;
    } & Pick<
      ComponentPropsWithRef<typeof Button>,
      "active" | "className" | "disabled" | "iconPosition"
    >
  > = pageRange.map((pageNumber) => ({
    active: pageNumber === currentPage,
    children: pageNumber === DOTS ? DOTS : String(pageNumber),
    disabled: pageNumber === DOTS,
    value: pageNumber === DOTS ? undefined : pageNumber,
  }));

  const next = () => Math.min(currentPage + 1, totalPage);
  const previous = () => Math.max(currentPage - 1, 1);

  return { active: currentPage, buttons, next, previous, totalPage };
};
