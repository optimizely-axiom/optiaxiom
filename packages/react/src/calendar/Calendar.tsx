import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";
import { type DateRange, DayPicker, type Matcher } from "react-day-picker";

import { Box, type BoxProps } from "../box";
import { CalendarChevron } from "./CalendarChevron";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayButton } from "./CalendarDayButton";
import { CalendarMonthCaption } from "./CalendarMonthCaption";
import { CalendarMonthGrid } from "./CalendarMonthGrid";
import { CalendarMonths } from "./CalendarMonths";
import { CalendarNav } from "./CalendarNav";
import { CalendarNextMonthButton } from "./CalendarNextMonthButton";
import { CalendarPreviousMonthButton } from "./CalendarPreviousMonthButton";
import { CalendarWeekday } from "./CalendarWeekday";

type CalendarProps = BoxProps<
  "div",
  {
    /**
     * Apply the `holiday` modifier to the matching days.
     */
    holiday?: Matcher | Matcher[];
    /**
     * The latest month to end the month navigation.
     */
    max?: Date;
    /**
     * The earliest month to start the month navigation.
     */
    min?: Date;
    /**
     * The today’s date. Default is the current date.
     */
    today?: Date;
    /**
     * Apply the `weekend` modifier to the matching days.
     */
    weekend?: Matcher | Matcher[];
  } & (
    | {
        /**
         * The initial selected value in uncontrolled mode.
         */
        defaultValue?: Date;
        mode?: "single";
        /**
         * Handler that is called when the selected value changes.
         */
        onValueChange?: (value: Date | undefined) => void;
        /**
         * The selected value in controlled mode.
         */
        value?: Date;
      }
    | {
        /**
         * The initial selected value in uncontrolled mode.
         */
        defaultValue?: DateRange;
        mode: "range";
        /**
         * Handler that is called when the selected value changes.
         */
        onValueChange?: (value: DateRange | undefined) => void;
        /**
         * The selected value in controlled mode.
         */
        value?: DateRange;
      }
  )
>;

const components = {
  Chevron: CalendarChevron,
  Day: CalendarDay,
  DayButton: CalendarDayButton,
  MonthCaption: CalendarMonthCaption,
  MonthGrid: CalendarMonthGrid,
  Months: CalendarMonths,
  Nav: CalendarNav,
  NextMonthButton: CalendarNextMonthButton,
  PreviousMonthButton: CalendarPreviousMonthButton,
  Weekday: CalendarWeekday,
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      defaultValue,
      holiday,
      max,
      min,
      mode = "single",
      onValueChange,
      today,
      value: valueProp,
      weekend,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState<
      Date | DateRange | undefined
    >({
      defaultProp: defaultValue,
      onChange: onValueChange as (value: Date | DateRange | undefined) => void,
      prop: valueProp,
    });

    return (
      <Box
        bg="bg.default"
        color="fg.default"
        fontSize="md"
        ref={ref}
        {...props}
      >
        <DayPicker
          autoFocus
          components={components}
          defaultMonth={value && "from" in value ? value.from : value}
          endMonth={max}
          mode={mode as "single"}
          modifiers={{ holiday, weekend }}
          numberOfMonths={mode === "range" ? 2 : 1}
          onSelect={setValue as (value: Date | undefined) => void}
          required
          selected={value as Date | undefined}
          showOutsideDays
          startMonth={min}
          today={today}
        />
      </Box>
    );
  },
);

Calendar.displayName = "@optiaxiom/react/Calendar";
