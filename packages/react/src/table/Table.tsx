import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Table.css";

export type TableProps = BoxProps<"div", styles.TableVariants>;

/**
 * Display tabular data using rows and columns.
 *
 * ⚠️ **IMPORTANT**: Consider using `DataTable` instead for displaying tabular
 * data.
 *
 * `DataTable` provides built-in support for:
 * - Sorting (client-side and server-side)
 * - Pagination (client-side and server-side)
 * - Row selection with checkboxes
 * - Column pinning (sticky columns)
 * - Row expansion
 * - Loading skeletons and empty states
 * - Sticky headers
 * - Column sizing and resizing
 * - Virtualization for large datasets
 *
 * `Table` is a low-level primitive and should only be used for very specific
 * custom table layouts. For most use cases, `DataTable` is the recommended
 * choice.
 *
 * @group Table
 * @since 1.4.0
 * @category data-display
 */
export const Table = forwardRef<HTMLDivElement, TableProps>(
  (
    {
      "aria-colcount": ariaColCount,
      "aria-rowcount": ariaRowCount,
      children,
      className,
      layout = "auto",
      tabIndex,
      ...props
    },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    const tableRef = useRef<HTMLTableElement>(null);

    /**
     * A scrollable region must be keyboard focusable so it can be scrolled
     * without a mouse, but one that doesn't scroll would be a dead Tab stop.
     * Observe the table too: rows added inside a fixed-height wrapper overflow
     * it without resizing it. jsdom has no `ResizeObserver`, so skip there.
     *
     * The attribute is set directly so resizes never re-render the table. A
     * consumer `tabIndex` is left to React.
     */
    useEffect(() => {
      const wrapper = innerRef.current;
      const table = tableRef.current;
      if (
        !wrapper ||
        !table ||
        tabIndex !== undefined ||
        typeof ResizeObserver === "undefined"
      ) {
        return;
      }

      const observer = new ResizeObserver(() => {
        if (
          wrapper.scrollWidth > wrapper.clientWidth ||
          wrapper.scrollHeight > wrapper.clientHeight
        ) {
          wrapper.tabIndex = 0;
        } else {
          wrapper.removeAttribute("tabindex");
        }
      });
      observer.observe(wrapper);
      observer.observe(table);
      return () => observer.disconnect();
    }, [tabIndex]);

    return (
      <Box
        ref={ref}
        tabIndex={tabIndex}
        {...styles.wrapper({}, className)}
        {...props}
      >
        <Box asChild {...styles.table({ layout })}>
          <table
            aria-colcount={ariaColCount}
            aria-rowcount={ariaRowCount}
            ref={tableRef}
          >
            {children}
          </table>
        </Box>
      </Box>
    );
  },
);

Table.displayName = "@optiaxiom/react/Table";
