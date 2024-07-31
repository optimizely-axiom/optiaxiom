import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { Menu } from "../menu";
import { MenuContent } from "../menu-content";
import { MenuItem } from "../menu-item";
import { MenuTrigger } from "../menu-trigger";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import * as styles from "./Pagination.css";

const PAGE_SIZES = [20, 30, 50, 100] as const;

type PaginationProps = BoxProps<
  "div",
  {
    dataCount: number;
    offset?: number;
    onPageSelect: (offset: number, pageSize: number) => void;
    pageSize?: number;
    showPageSize?: boolean;
  }
>;

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      children,
      className,
      dataCount,
      offset = 0,
      onPageSelect,
      pageSize = PAGE_SIZES[0],
      showPageSize = false,
      ...props
    },
    ref,
  ) => {
    const handlePageSelect = (page: number) => {
      const offset = (page - 1) * pageSize;
      onPageSelect(offset, pageSize);
    };

    const currentPage = Math.floor(offset / pageSize) + 1;

    const totalPage = Math.ceil(dataCount / pageSize);
    const buttonConfigs = getButtonConfigs(currentPage, totalPage);

    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        ref={ref}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        <Flex flexDirection="row" {...restProps}>
          {showPageSize && (
            <Box>
              <Menu>
                <MenuTrigger>
                  <Text>Page Size</Text>
                </MenuTrigger>
                <MenuContent>
                  {PAGE_SIZES.map((size) => (
                    <MenuItem key={size}>
                      {/* <Option key={size} name={String(size)}> */}
                      {size}
                      {/* </Option> */}
                    </MenuItem>
                  ))}
                </MenuContent>
              </Menu>
              {/* <Menu onSelect={handlePageSizeSelect} position="topLeft">
              {PAGE_SIZES.map((size) => (
                <Option key={size} name={String(size)}>
                  {size}
                </Option>
              ))}
            </Menu> */}
            </Box>
          )}
          {totalPage > 1 && (
            <ButtonGroup gap="2">
              {buttonConfigs.map(({ value, ...props }) => (
                <Button
                  appearance="secondary"
                  gap="2"
                  key={`${value}-${props.children}`}
                  onClick={() => handlePageSelect(Number(value))}
                  {...props}
                />
              ))}
            </ButtonGroup>
          )}
        </Flex>
      </Box>
    );
  },
);

Pagination.displayName = "@optiaxiom/react/Pagination";

function getButtonConfigs(currentPage: number, totalPage: number) {
  const buttons: Array<
    {
      children: string;
      value?: number | string;
    } & Pick<
      ComponentPropsWithRef<typeof Button>,
      "className" | "disabled" | "icon" | "iconPosition"
    >
  > = [];

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

  return buttons;
}
