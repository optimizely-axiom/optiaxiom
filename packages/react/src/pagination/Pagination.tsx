import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { PaginationButton } from "../pagination-button/PaginationButton";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Pagination.css";
import { usePagination } from "./usePagination";

export type PaginationProps = BoxProps<
  "nav",
  {
    boundaries?: number;
    disabled?: boolean;
    offset?: number;
    onChange: (offset: number, pageSize: number) => void;
    pageSize?: number;
    siblings?: number;
    total: number;
  }
>;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      boundaries = 1,
      className,
      disabled = false,
      offset = 0,
      onChange,
      pageSize = 20,
      siblings = 1,
      total,
      ...props
    },
    ref,
  ) => {
    const handlePageSelect = (page: number) => {
      const offset = (page - 1) * pageSize;
      onChange(offset, pageSize);
    };

    const { active, buttons, next, previous, totalPage } = usePagination(
      boundaries,
      offset,
      pageSize,
      siblings,
      total,
    );
    const { restProps, sprinkleProps } = extractSprinkles(props);

    if (totalPage <= 1) return null;

    return (
      <Box
        data-disabled={disabled}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        <nav aria-label="Pagination" ref={ref} {...restProps}>
          <Flex asChild {...styles.paginationList()}>
            <ul>
              <li>
                <PaginationButton
                  appearance="secondary"
                  aria-label="Go to previous page"
                  disabled={active === 1}
                  icon={<IconAngleLeft />}
                  onClick={() => handlePageSelect(previous())}
                >
                  Previous
                </PaginationButton>
              </li>
              {buttons.map(({ children, value, ...props }, index) => (
                <li key={`${value || children}-${index}`}>
                  <PaginationButton
                    aria-current={active === Number(value) ? "page" : undefined}
                    onClick={() => handlePageSelect(Number(value))}
                    {...props}
                  >
                    {children}
                  </PaginationButton>
                </li>
              ))}
              <li>
                <PaginationButton
                  appearance="secondary"
                  aria-label="Go to next page"
                  disabled={active === totalPage}
                  icon={<IconAngleRight />}
                  iconPosition="end"
                  onClick={() => handlePageSelect(next())}
                >
                  Next
                </PaginationButton>
              </li>
            </ul>
          </Flex>
        </nav>
      </Box>
    );
  },
);

Pagination.displayName = "@optiaxiom/react/Pagination";
