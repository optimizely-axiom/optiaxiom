import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useDataTableContext } from "../data-table-context";
import { Flex } from "../flex";
import { Pagination } from "../pagination";

type DataTableFooterProps = BoxProps;

export const DataTableFooter = forwardRef<HTMLDivElement, DataTableFooterProps>(
  (props, ref) => {
    const { table } = useDataTableContext("DataTableFooter");

    return (
      <Flex
        alignSelf="stretch"
        flexDirection="row"
        justifyContent="space-around"
        ref={ref}
        {...props}
      >
        {table.getPageCount() > 1 && (
          <Box mt="8">
            <Pagination
              onPageChange={(newPage) => table.setPageIndex(newPage - 1)}
              page={table.getState().pagination.pageIndex + 1}
              total={table.getPageCount()}
            />
          </Box>
        )}
      </Flex>
    );
  },
);

DataTableFooter.displayName = "@optiaxiom/react/DataTableFooter";
