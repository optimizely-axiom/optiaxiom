import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";
import { DayPicker, type Matcher } from "react-day-picker";

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
     * Handler that is called when the selected value changes.
     */
    onValueChange?: (value: Date | undefined) => void;
    /**
     * The today’s date. Default is the current date.
     */
    today?: Date;
    /**
     * The selected value in controlled mode.
     */
    value?: Date;
    /**
     * Apply the `weekend` modifier to the matching days.
     */
    weekend?: Matcher | Matcher[];
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
      holiday,
      max,
      min,
      onValueChange,
      today,
      value: valueProp,
      weekend,
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
        ref={ref}
        {...props}
      >
        <DayPicker
          autoFocus
          components={components}
          defaultMonth={value}
          endMonth={max}
          mode="single"
          modifiers={{ holiday, weekend }}
          onSelect={setValue}
          required
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
