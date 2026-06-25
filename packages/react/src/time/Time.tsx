import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { formatDate } from "./formatDate";

export type TimeProps = BoxProps<
  "time",
  {
    /**
     * The date to display. Can be a `Date` object or an ISO 8601 string.
     * Unparseable values render nothing at runtime instead of throwing.
     */
    date: Date | string;
    /**
     * Whether to show the date part of the value. Defaults to `true`.
     */
    showDate?: boolean;
    /**
     * Whether to show the time part of the value. Defaults to `false`.
     */
    showTime?: boolean;
  }
>;

/**
 * A flexbox layout component for grouping items horizontally or vertically.
 *
 * @category data-display
 * @experimental
 */
export const Time = forwardRef<HTMLTimeElement, TimeProps>(
  ({ date, showDate = true, showTime, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    const parsed = date instanceof Date ? date : new Date(date ?? NaN);
    if (Number.isNaN(parsed.getTime())) return null;
    const value = formatDate(parsed, { showDate, showTime });

    return (
      <Box asChild {...boxProps}>
        <time dateTime={parsed.toISOString()} ref={ref} {...restProps}>
          {value}
        </time>
      </Box>
    );
  },
);

Time.displayName = "@optiaxiom/react/Time";
