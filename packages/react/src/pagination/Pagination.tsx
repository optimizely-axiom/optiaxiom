import { usePagination } from "@mantine/hooks";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { IconEllipsis } from "../icons/IconEllipsis";
import { PaginationButton } from "../pagination-button/PaginationButton";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Pagination.css";

export type PaginationProps = BoxProps<
  "nav",
  {
    boundaries?: number;
    disabled?: boolean;
    offset?: number;
    onChange: (offset: number) => void;
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
      offset: page = 1,
      onChange,
      siblings = 1,
      total,
      ...props
    },
    ref,
  ) => {
    const { active, next, previous, range, setPage } = usePagination({
      boundaries,
      onChange,
      page,
      siblings,
      total,
    });
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Box
        asChild
        data-disabled={disabled}
        {...styles.pagination({}, className)}
        {...sprinkleProps}
      >
        <nav aria-label="Pagination" ref={ref} {...restProps}>
          <Flex asChild {...styles.list()}>
            <ul>
              <li>
                <PaginationButton
                  appearance="secondary"
                  aria-label="Go to previous page"
                  disabled={active === 1}
                  icon={<IconAngleLeft />}
                  onClick={previous}
                >
                  Previous
                </PaginationButton>
              </li>

              {range.map((page, index) => (
                <li key={`${index}`}>
                  {page === "dots" ? (
                    <Box asChild>
                      <IconEllipsis />
                    </Box>
                  ) : (
                    <PaginationButton
                      active={active === page}
                      aria-current={active === page ? "page" : undefined}
                      onClick={() => setPage(page)}
                    >
                      {page}
                    </PaginationButton>
                  )}
                </li>
              ))}

              <li>
                <PaginationButton
                  appearance="secondary"
                  aria-label="Go to next page"
                  disabled={active === total}
                  icon={<IconAngleRight />}
                  iconPosition="end"
                  onClick={next}
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
