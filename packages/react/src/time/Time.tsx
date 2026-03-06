import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { formatDate } from "./formatDate";

export type TimeProps = BoxProps<
  "time",
  {
    /**
     * The date to display. Can be a `Date` object or an ISO 8601 string.
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

    if (typeof date === "string") {
      date = new Date(date);
    }
    const value = formatDate(date, { showDate, showTime });

    return (
      <Box asChild {...boxProps}>
        <time dateTime={date.toISOString()} ref={ref} {...restProps}>
          {value}
        </time>
      </Box>
    );
  },
);

Time.displayName = "@optiaxiom/react/Time";
