import { usePagination } from "@mantine/hooks";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { ButtonBase } from "../button-base";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { IconEllipsis } from "../icons/IconEllipsis";
import { Tooltip } from "../tooltip";
import * as styles from "./Pagination.css";

export type PaginationProps = BoxProps<
  "nav",
  {
    defaultPage?: number;
    disabled?: boolean;
    onPageChange?: (offset: number) => void;
    page?: number;
    total: number;
  }
>;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    { defaultPage, disabled, onPageChange, page: pageProp, total, ...props },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      defaultProp: defaultPage,
      onChange: onPageChange,
      prop: pageProp,
    });
    const { active, next, previous, range, setPage } = usePagination({
      onChange: setValue,
      page: value,
      siblings: 2,
      total,
    });

    return (
      <Box asChild {...props}>
        <nav aria-label="pagination" ref={ref}>
          <Flex asChild flexDirection="row" gap="2">
            <ul>
              <li>
                <Tooltip content="Prev" disabled={disabled || active === 1}>
                  <Button
                    appearance="subtle"
                    aria-label="Previous page"
                    disabled={disabled || active === 1}
                    icon={<IconAngleLeft />}
                    onClick={previous}
                  />
                </Tooltip>
              </li>

              {range.map((page, index) => (
                <li
                  key={
                    page === "dots"
                      ? `${page}-${
                          index < range.indexOf(active) ? "before" : "after"
                        }`
                      : page
                  }
                >
                  {page === "dots" ? (
                    <Box
                      alignItems="stretch"
                      display="flex"
                      justifyContent="center"
                      px="6"
                      py="8"
                      size="md"
                    >
                      <Icon asChild>
                        <IconEllipsis />
                      </Icon>
                    </Box>
                  ) : (
                    <ButtonBase
                      appearance="subtle"
                      aria-current={active === page ? "page" : undefined}
                      data-state={active === page ? "active" : undefined}
                      disabled={disabled}
                      onClick={() => setPage(page)}
                      {...styles.button()}
                    >
                      <VisuallyHidden>page</VisuallyHidden> {page}
                      {page === 1 ? (
                        <VisuallyHidden>(first page)</VisuallyHidden>
                      ) : page === total ? (
                        <VisuallyHidden>(last page)</VisuallyHidden>
                      ) : null}
                    </ButtonBase>
                  )}
                </li>
              ))}

              <li>
                <Tooltip content="Next" disabled={disabled || active === total}>
                  <Button
                    appearance="subtle"
                    aria-label="Next page"
                    disabled={disabled || active === total}
                    icon={<IconAngleRight />}
                    onClick={next}
                  />
                </Tooltip>
              </li>
            </ul>
          </Flex>
        </nav>
      </Box>
    );
  },
);

Pagination.displayName = "@optiaxiom/react/Pagination";
