import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./Pagination.css";
import { usePagination } from "./usePagination";

type PaginationProps = BoxProps<
  "div",
  {
    offset?: number;
    onPageSelect: (offset: number, pageSize: number) => void;
    pageSize?: number;
    total: number;
  }
>;

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      children,
      className,
      offset = 0,
      onPageSelect,
      pageSize = 20,
      total,
      ...props
    },
    ref,
  ) => {
    const handlePageSelect = (page: number) => {
      const offset = (page - 1) * pageSize;
      onPageSelect(offset, pageSize);
    };

    const { buttons, totalPage } = usePagination(offset, total, pageSize);
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
              {buttons.map(({ value, ...props }) => (
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
