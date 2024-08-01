import type { ComponentPropsWithRef } from "react";

import type { Button } from "../button";

import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";

export const usePagination = (
  offset: number,
  dataCount: number,
  pageSize: number,
  // currentPage: number, totalPage: number
) => {
  const buttons: Array<
    {
      children: string;
      value?: number | string;
    } & Pick<
      ComponentPropsWithRef<typeof Button>,
      "className" | "disabled" | "icon" | "iconPosition"
    >
  > = [];

  const currentPage = Math.floor(offset / pageSize) + 1;
  const totalPage = Math.ceil(dataCount / pageSize);

  buttons.push({
    children: "Prev",
    disabled: currentPage === 1,
    icon: <IconAngleLeft />,
    iconPosition: "start",
    value: currentPage - 1,
  });

  let startPage = Math.max(currentPage - 1, 1);
  let endPage = Math.min(currentPage + 1, totalPage);

  if (currentPage - startPage < 1) {
    endPage = Math.min(startPage + 2, totalPage);
  }
  if (endPage - currentPage < 1) {
    startPage = Math.max(endPage - 2, 1);
  }

  if (startPage > 1) {
    buttons.push({ children: "1", value: 1 });
    if (startPage > 2) {
      buttons.push({
        children: "...",
        disabled: true,
      });
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    buttons.push({
      children: String(page),
      // isActive: page === currentPage,
      value: page,
    });
  }

  if (endPage < totalPage) {
    if (endPage < totalPage - 1) {
      buttons.push({
        children: "...",
        disabled: true,
      });
    }
    buttons.push({ children: String(totalPage), value: totalPage });
  }

  buttons.push({
    children: "Next",
    disabled: currentPage === totalPage,
    icon: <IconAngleRight />,
    iconPosition: "end",
    value: currentPage + 1,
  });

  return { buttons, totalPage };
};
