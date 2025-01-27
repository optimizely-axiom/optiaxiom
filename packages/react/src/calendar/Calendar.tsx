import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";
import { DayPicker } from "react-day-picker";

import { Box, type BoxProps } from "../box";
import { CalendarChevron } from "./CalendarChevron";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayButton } from "./CalendarDayButton";
import { CalendarMonthCaption } from "./CalendarMonthCaption";
import { CalendarMonthGrid } from "./CalendarMonthGrid";
import { CalendarMonths } from "./CalendarMonths";
import { CalendarNextMonthButton } from "./CalendarNextMonthButton";
import { CalendarPreviousMonthButton } from "./CalendarPreviousMonthButton";
import { CalendarWeekday } from "./CalendarWeekday";

type CalendarProps = BoxProps<
  "div",
  {
    /**
     * The initial selected value in uncontrolled mode.
     */
    defaultValue?: Date;
    /**
     * The latest month to end the month navigation.
     */
    max?: Date;
    /**
     * The earliest month to start the month navigation.
     */
    min?: Date;
    /**
     * Handler that is called when the selected value changes.
     */
    onValueChange?: (value: Date) => void;
    /**
     * The today’s date. Default is the current date.
     */
    today?: Date;
    /**
     * The selected value in controlled mode.
     */
    value?: Date;
  }
>;

const components = {
  Chevron: CalendarChevron,
  Day: CalendarDay,
  DayButton: CalendarDayButton,
  MonthCaption: CalendarMonthCaption,
  MonthGrid: CalendarMonthGrid,
  Months: CalendarMonths,
  NextMonthButton: CalendarNextMonthButton,
  PreviousMonthButton: CalendarPreviousMonthButton,
  Weekday: CalendarWeekday,
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      defaultValue,
      max,
      min,
      onValueChange,
      today,
      value: valueProp,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      defaultProp: defaultValue,
      onChange: onValueChange,
      prop: valueProp,
    });

    return (
      <Box
        bg="bg.default"
        color="fg.default"
        fontSize="md"
        p="16"
        ref={ref}
        {...props}
      >
        <DayPicker
          autoFocus
          components={components}
          defaultMonth={value}
          endMonth={max}
          fixedWeeks
          mode="single"
          onSelect={setValue}
          selected={value}
          showOutsideDays
          startMonth={min}
          today={today}
        />
      </Box>
    );
  },
);

Calendar.displayName = "@optiaxiom/react/Calendar";
