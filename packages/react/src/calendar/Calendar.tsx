import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef } from "react";
import { type DateRange, DayPicker, type Matcher } from "react-day-picker";

import { type BoxProps } from "../box";
import { Clock } from "../clock";
import { Flex } from "../flex";
import { Separator } from "../separator";
import { Text } from "../text";
import { useEffectEvent } from "../use-event";
import { useResponsiveMatches } from "../use-responsive-matches";
import { toPlainDate, toPlainTime } from "../utils";
import { CalendarChevron } from "./CalendarChevron";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayButton } from "./CalendarDayButton";
import { CalendarMonthCaption } from "./CalendarMonthCaption";
import { CalendarMonthGrid } from "./CalendarMonthGrid";
import { CalendarMonths } from "./CalendarMonths";
import { CalendarNav } from "./CalendarNav";
import { CalendarNextMonthButton } from "./CalendarNextMonthButton";
import { CalendarPreviousMonthButton } from "./CalendarPreviousMonthButton";
import { CalendarWeek } from "./CalendarWeek";
import { CalendarWeekday } from "./CalendarWeekday";
import { CalendarWeekdays } from "./CalendarWeekdays";

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
    onHeightChange?: (height: number) => void;
    step?: number | string;
    /**
     * The today’s date. Default is the current date.
     */
    today?: Date;
    type?: "date" | "datetime-local";
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
  Week: CalendarWeek,
  Weekday: CalendarWeekday,
  Weekdays: CalendarWeekdays,
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      defaultValue,
      holiday,
      max,
      min,
      mode = "single",
      onHeightChange,
      onValueChange,
      step,
      today,
      type = "date",
      value: valueProp,
      weekend,
      ...props
    },
    outerRef,
  ) => {
    const [value, setValue] = useControllableState<
      Date | DateRange | undefined
    >({
      defaultProp: defaultValue,
      onChange: onValueChange as (value: Date | DateRange | undefined) => void,
      prop: valueProp,
    });
    const time =
      type === "date"
        ? "00:00"
        : toPlainTime(value instanceof Date ? value : new Date(), step);
    const numberOfMonths = useResponsiveMatches({
      base: 1,
      sm: 2,
    });

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const onHeightChangeStable = useEffectEvent(onHeightChange ?? (() => {}));
    useEffect(() => {
      if (!innerRef.current) {
        return;
      }

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          onHeightChangeStable(entry.contentRect.height);
        }
      });
      observer.observe(innerRef.current);

      return () => observer.disconnect();
    }, [onHeightChangeStable]);

    return (
      <Flex
        bg="bg.default"
        color="fg.default"
        fontSize="md"
        gap="4"
        ref={ref}
        {...props}
      >
        <DayPicker
          autoFocus
          components={components}
          defaultMonth={
            value && typeof value === "object" && "from" in value
              ? value.from
              : value
          }
          disabled={[
            ...(min ? [{ before: min }] : []),
            ...(max ? [{ after: max }] : []),
          ]}
          mode={mode as "single"}
          modifiers={{ holiday, weekend }}
          numberOfMonths={mode === "range" ? numberOfMonths : 1}
          onSelect={(value: Date | DateRange | undefined) => {
            setValue(
              value instanceof Date
                ? new Date(toPlainDate(value) + "T" + (time ?? "00:00"))
                : value,
            );
          }}
          required
          selected={value as Date | undefined}
          today={today}
        />
        {type === "datetime-local" && mode == "single" && (
          <Flex gap="8">
            <Separator mb="4" />
            <Clock
              onValueChange={(time) => {
                setValue(
                  new Date(
                    toPlainDate(value instanceof Date ? value : new Date()) +
                      "T" +
                      time,
                  ),
                );
              }}
              step={step}
              value={time}
            />
            <Text color="fg.tertiary" fontSize="sm" w="full">
              {(value instanceof Date ? value : new Date())
                .toTimeString()
                .slice(9)}
            </Text>
          </Flex>
        )}
      </Flex>
    );
  },
);

Calendar.displayName = "@optiaxiom/react/Calendar";
