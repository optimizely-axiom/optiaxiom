import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { useDataTableContext } from "../data-table-context";
import { Flex } from "../flex";
import { Pagination } from "../pagination";
import { Select } from "../select";
import { SelectContent } from "../select-content";
import { SelectRadioItem } from "../select-radio-item";
import { SelectTrigger } from "../select-trigger";
import { SelectValue } from "../select-value";
import { Text } from "../text";

type DataTableFooterProps = BoxProps<
  "div",
  {
    pageSizeOptions?: string[];
    showPageSizeOptions?: boolean;
  }
>;

const DEFAULT_PAGE_SIZES = ["10", "20", "30", "50", "100"];

export const DataTableFooter = forwardRef<HTMLDivElement, DataTableFooterProps>(
  (
    { pageSizeOptions = DEFAULT_PAGE_SIZES, showPageSizeOptions, ...props },
    ref,
  ) => {
    const { table } = useDataTableContext("DataTableFooter");

    const { pagination } = table.getState();
    const pageSizeId = useId();

    return (
      <Flex
        alignSelf="stretch"
        flexDirection="row"
        justifyContent="space-between"
        ref={ref}
        {...props}
      >
        <Flex flexDirection="row" gap="8">
          {showPageSizeOptions && (
            <>
              <Text color="fg.secondary" id={pageSizeId}>
                Page Size
              </Text>
              <Select
                items={pageSizeOptions}
                onValueChange={(value) =>
                  value && table.setPageSize(parseFloat(value))
                }
                value={pagination.pageSize.toString()}
              >
                <SelectTrigger appearance="subtle" aria-labelledby={pageSizeId}>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {pageSizeOptions.map((rows) => (
                    <SelectRadioItem item={rows} key={rows}>
                      {rows}
                    </SelectRadioItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </Flex>

        {table.getPageCount() > 1 && (
          <Pagination
            onPageChange={(newPage) => table.setPageIndex(newPage - 1)}
            page={pagination.pageIndex + 1}
            total={table.getPageCount()}
          />
        )}

        <Text>
          {table.getRowCount() > 0 && (
            <>
              {pagination.pageIndex * pagination.pageSize + 1} -{" "}
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                table.getRowCount(),
              )}{" "}
              of {table.getRowCount()}
            </>
          )}
        </Text>
      </Flex>
    );
  },
);

DataTableFooter.displayName = "@optiaxiom/react/DataTableFooter";
