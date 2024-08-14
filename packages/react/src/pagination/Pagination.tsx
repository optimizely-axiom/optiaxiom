import { usePagination } from "@mantine/hooks";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { IconEllipsis } from "../icons/IconEllipsis";
import { Tooltip } from "../tooltip";
import * as styles from "./Pagination.css";

export type PaginationProps = BoxProps<
  "nav",
  {
    boundaries?: number;
    defaultPage?: number;
    disabled?: boolean;
    onPageChange?: (offset: number) => void;
    page?: number;
    siblings?: number;
    total: number;
  }
>;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      boundaries = 1,
      defaultPage,
      disabled,
      onPageChange,
      page: pageProp,
      siblings = 1,
      total,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      defaultProp: defaultPage,
      onChange: onPageChange,
      prop: pageProp,
    });
    const { active, next, previous, range, setPage } = usePagination({
      boundaries,
      onChange: setValue,
      page: value,
      siblings,
      total,
    });

    return (
      <Box asChild {...props}>
        <nav aria-label="pagination" ref={ref}>
          <Flex asChild flexDirection="row" gap="2">
            <ul>
              <li>
                <Tooltip content="Prev">
                  <Button
                    appearance="secondary"
                    aria-label="Previous page"
                    disabled={disabled || active === 1}
                    icon={<IconAngleLeft />}
                    onClick={previous}
                  />
                </Tooltip>
              </li>

              {range.map((page, index) => (
                <li key={`${index}`}>
                  {page === "dots" ? (
                    <Box
                      alignItems="stretch"
                      display="flex"
                      justifyContent="center"
                      py="10"
                      size="md"
                    >
                      <Box alignItems="end" display="flex">
                        <Box asChild>
                          <IconEllipsis />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      appearance="secondary"
                      aria-current={active === page ? "page" : undefined}
                      data-state={active === page ? "active" : undefined}
                      disabled={disabled}
                      onClick={() => setPage(page)}
                      {...styles.button()}
                    >
                      <Box mx="0">
                        <VisuallyHidden>page</VisuallyHidden> {page}
                        {page === 1 ? (
                          <VisuallyHidden>(first page)</VisuallyHidden>
                        ) : page === total ? (
                          <VisuallyHidden>(last page)</VisuallyHidden>
                        ) : null}
                      </Box>
                    </Button>
                  )}
                </li>
              ))}

              <li>
                <Tooltip content="Next">
                  <Button
                    appearance="secondary"
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
