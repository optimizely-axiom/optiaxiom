import { usePagination } from "@mantine/hooks";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { IconEllipsis } from "../icons/IconEllipsis";
import { PaginationButton } from "../pagination-button/PaginationButton";

export type PaginationProps = BoxProps<
  "nav",
  {
    boundaries?: number;
    disabled?: boolean;
    onChange: (offset: number) => void;
    page?: number;
    siblings?: number;
    total: number;
  }
>;

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      boundaries = 1,
      disabled,
      onChange,
      page = 1,
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

    return (
      <Box asChild {...props}>
        <nav aria-label="pagination" ref={ref}>
          <Flex asChild flexDirection="row" gap="2">
            <ul>
              <li>
                <PaginationButton
                  disabled={disabled || active === 1}
                  onClick={previous}
                  startDecorator={<IconAngleLeft />}
                >
                  Previous <VisuallyHidden>page</VisuallyHidden>
                </PaginationButton>
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
                    <PaginationButton
                      active={active === page}
                      aria-current={active === page ? "page" : undefined}
                      disabled={disabled}
                      onClick={() => setPage(page)}
                    >
                      <VisuallyHidden>page</VisuallyHidden> {page}
                      {page === 1 ? (
                        <VisuallyHidden>(first page)</VisuallyHidden>
                      ) : page === total ? (
                        <VisuallyHidden>(last page)</VisuallyHidden>
                      ) : null}
                    </PaginationButton>
                  )}
                </li>
              ))}

              <li>
                <PaginationButton
                  disabled={disabled || active === total}
                  endDecorator={<IconAngleRight />}
                  onClick={next}
                >
                  Next <VisuallyHidden>page</VisuallyHidden>
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
