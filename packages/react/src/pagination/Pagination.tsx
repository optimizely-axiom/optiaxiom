import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { Flex } from "../flex";
import { IconAngleLeft } from "../icons/IconAngleLeft";
import { IconAngleRight } from "../icons/IconAngleRight";
import { PaginationButton } from "../pagination-button/PaginationButton";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Pagination.css";
import { usePagination } from "./usePagination";

type PaginationProps = BoxProps<
  "div",
  {
    boundaries?: number;
    offset?: number;
    onChange: (offset: number, pageSize: number) => void;
    pageSize?: number;
    siblings?: number;
    total: number;
  }
>;

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      boundaries = 1,
      children,
      className,
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

    return (
      <Box
        asChild
        ref={ref}
        {...styles.wrapper({}, className)}
        {...sprinkleProps}
      >
        <Flex flexDirection="row" {...restProps}>
          {totalPage > 1 && (
            <ButtonGroup gap="2">
              <Button
                appearance="secondary"
                disabled={active === 1}
                icon={<IconAngleLeft />}
                onClick={() => handlePageSelect(previous())}
              >
                Previous
              </Button>
              {buttons.map(({ children, value, ...props }, index) => (
                <PaginationButton
                  appearance="secondary"
                  gap="2"
                  key={`${value || children}-${index}`}
                  onClick={() => handlePageSelect(Number(value))}
                  {...props}
                >
                  {children}
                </PaginationButton>
              ))}
              <Button
                appearance="secondary"
                disabled={active === totalPage}
                icon={<IconAngleRight />}
                iconPosition="end"
                onClick={() => handlePageSelect(next())}
              >
                Next
              </Button>
            </ButtonGroup>
          )}
        </Flex>
      </Box>
    );
  },
);

Pagination.displayName = "@optiaxiom/react/Pagination";
