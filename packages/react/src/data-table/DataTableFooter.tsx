import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Group } from "../group";
import { useMessages } from "../locale";
import { Pagination } from "../pagination";
import { Select, SelectContent, SelectTrigger } from "../select";
import { Text } from "../text";
import { useDataTableContext } from "./DataTableContext";
import * as styles from "./DataTableFooter.css";

export type DataTableFooterProps = BoxProps<
  "div",
  {
    /**
     * Specify a custom set of page size options.
     */
    pageSizeOptions?: Array<{
      /**
       * String representation of page size option.
       */
      label: string;
      /**
       * The unique key/value for each page size option.
       */
      value: string;
    }>;
    /**
     * Whether to show a dropdown that allows controlling how many rows to show per page.
     */
    showPageSizeOptions?: boolean;
  }
>;

const DEFAULT_PAGE_SIZES = ["10", "20", "30", "50", "100"].map((size) => ({
  label: size,
  value: size,
}));

/**
 * @group DataTable
 */
export const DataTableFooter = forwardRef<HTMLDivElement, DataTableFooterProps>(
  (
    { pageSizeOptions = DEFAULT_PAGE_SIZES, showPageSizeOptions, ...props },
    ref,
  ) => {
    const { table } = useDataTableContext("@optiaxiom/react/DataTableFooter");

    const pagination = table.getPagination();
    const pageCount = table.getPageCount();
    const rowCount = table.getRowCount();
    const pageSizeId = useId();
    const messages = useMessages();

    return (
      <Group
        alignSelf="stretch"
        fontSize="md"
        gap="16"
        justifyContent="space-between"
        mt="auto"
        ref={ref}
        {...props}
      >
        <Box {...styles.addon({ slot: "before" })}>
          {showPageSizeOptions && (
            <Group gap="8">
              <Text color="fg.secondary" id={pageSizeId}>
                {messages["Page Size"]}
              </Text>
              <Select
                onValueChange={(value) =>
                  value && table.setPageSize(parseFloat(value))
                }
                options={pageSizeOptions}
                value={pagination.pageSize.toString()}
              >
                <SelectTrigger
                  appearance="subtle"
                  aria-labelledby={pageSizeId}
                />
                <SelectContent />
              </Select>
            </Group>
          )}
        </Box>
        {pageCount > 1 && (
          <Pagination
            onPageChange={(newPage) => table.setPageIndex(newPage - 1)}
            page={pagination.pageIndex + 1}
            total={pageCount}
          />
        )}
        <Text {...styles.addon({ slot: "after" })}>
          {rowCount > 0 &&
            messages["{start} - {end} of {total}"](
              pagination.pageIndex * pagination.pageSize + 1,
              Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                rowCount,
              ),
              rowCount,
            )}
        </Text>
      </Group>
    );
  },
);

DataTableFooter.displayName = "@optiaxiom/react/DataTableFooter";
