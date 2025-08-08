import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker, type Matcher } from "react-day-picker";

import { Box, type BoxProps } from "../box";
import { Clock } from "../clock";
import { Flex } from "../flex";
import { InputControl, InputRoot } from "../input";
import { usePopoverContentContext } from "../popover/internals";
import { Text } from "../text";
import { toInstant, toPlainDate, toPlainTime } from "../utils";
import * as styles from "./Calendar.css";
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
import { toTimeZoneName } from "./toTimeZoneName";

export type CalendarProps = BoxProps<
  "div",
  Pick<
    ComponentPropsWithoutRef<typeof DayPicker>,
    "month" | "onMonthChange" | "today"
  > & {
    /**
     * Apply the `holiday` modifier to the matching days.
     */
    holiday?: Matcher | Matcher[];
    /**
     * The latest date that is allowed.
     */
    max?: Date;
    /**
     * The earliest date that is allowed.
     */
    min?: Date;
    /**
     * Handler that is called when a date is selected regardless of mode.
     */
    onDateSelect?: (date: Date) => void;
    /**
     * Specify the stepping value in days (date) or seconds (datetime-local) for the allowed values.
     */
    step?: number | string;
    /**
     * Control whether the calendar shows only date or both date and time pickers.
     */
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
          defaultValue?: DateRange | null;
          /**
           * Enable the selection of a single day or a range of days.
           */
          mode: "range";
          /**
           * Handler that is called when the selected value changes.
           */
          onValueChange?: (value: DateRange | null) => void;
          /**
           * The selected value in controlled mode.
           */
          value?: DateRange | null;
        }
      | {
          /**
           * The initial selected value in uncontrolled mode.
           */
          defaultValue?: Date | null;
          /**
           * Enable the selection of a single day or a range of days.
           */
          mode?: "single";
          /**
           * Handler that is called when the selected value changes.
           */
          onValueChange?: (value: Date | null) => void;
          /**
           * The selected value in controlled mode.
           */
          value?: Date | null;
        }
    )
>;

type DateRange = { from: Date; to: Date };

const components = {
  Chevron: CalendarChevron,
  Day: CalendarDay,
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
      defaultValue = null,
      holiday,
      max,
      min,
      mode = "single",
      month,
      onDateSelect,
      onMonthChange,
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
    const { side } = usePopoverContentContext("@optiaxiom/react/Calendar");

    const [value, setValue] = useControllableState<Date | DateRange | null>({
      caller: "@optiaxiom/react/Calendar",
      defaultProp: defaultValue,
      onChange: onValueChange as (value: Date | DateRange | null) => void,
      prop: valueProp,
    });
    const time =
      type === "date"
        ? "00:00"
        : toPlainTime(value instanceof Date ? value : new Date(), step);

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();

    const DayButtonMemo = useMemo(
      () =>
        function DayButton({
          onFocus,
          onPointerEnter,
          onPointerLeave,
          ...props
        }: ComponentPropsWithoutRef<typeof CalendarDayButton>) {
          return (
            <CalendarDayButton
              onFocus={(event) => {
                onFocus?.(event);
                if (from) {
                  setTo(props.day.date);
                }
              }}
              onPointerEnter={(event) => {
                onPointerEnter?.(event);
                if (!event.currentTarget.disabled && from) {
                  setTo(props.day.date);
                }
              }}
              onPointerLeave={(event) => {
                onPointerLeave?.(event);
                if (!event.currentTarget.disabled && from) {
                  setTo(from);
                }
              }}
              {...props}
            />
          );
        },
      [from],
    );

    return (
      <Flex
        bg="bg.default"
        color="fg.default"
        fontSize="md"
        gap="4"
        ref={ref}
        {...props}
      >
        <Box asChild {...styles.picker({ side })}>
          {mode === "single" ? (
            <DayPicker
              autoFocus
              components={{
                ...components,
                DayButton: DayButtonMemo,
              }}
              defaultMonth={value instanceof Date ? value : undefined}
              disabled={[
                ...(min ? [{ before: min }] : []),
                ...(max ? [{ after: max }] : []),
              ]}
              mode="single"
              modifiers={{ holiday, weekend }}
              month={month}
              onMonthChange={onMonthChange}
              onSelect={(value) => {
                const date = value
                  ? new Date(toPlainDate(value) + "T" + (time ?? "00:00"))
                  : (value ?? null);
                setValue(date);
                onDateSelect?.(date);
              }}
              required
              selected={value instanceof Date ? value : undefined}
              today={today}
            />
          ) : (
            <DayPicker
              autoFocus
              components={{
                ...components,
                DayButton: DayButtonMemo,
              }}
              defaultMonth={
                value && typeof value === "object" && "from" in value
                  ? value.from
                  : undefined
              }
              disabled={[
                ...(min ? [{ before: min }] : []),
                ...(max ? [{ after: max }] : []),
              ]}
              fixedWeeks
              mode="range"
              modifiers={{ holiday, weekend }}
              month={month}
              onMonthChange={onMonthChange}
              onSelect={(newValue) => {
                if (!from) {
                  const oldFrom =
                    value && typeof value === "object" && "from" in value
                      ? value.from
                      : undefined;
                  const newFrom =
                    oldFrom && newValue?.from && newValue.from < oldFrom
                      ? newValue.from
                      : newValue?.to;
                  setFrom(newFrom);
                  setTo(newFrom);
                  if (newFrom) {
                    onDateSelect?.(newFrom);
                  }
                  setValue(
                    newFrom
                      ? {
                          from: newFrom,
                          to: toEndOfDay(newFrom),
                        }
                      : null,
                  );
                } else {
                  setFrom(undefined);
                  const start = to && to < from ? to : from;
                  const end =
                    to && to < from
                      ? toEndOfDay(from)
                      : to
                        ? toEndOfDay(to)
                        : undefined;
                  if (end) {
                    onDateSelect?.(end);
                  }
                  setValue(
                    end
                      ? {
                          from: start,
                          to: end,
                        }
                      : null,
                  );
                }
              }}
              required
              selected={
                from
                  ? to && to < from
                    ? { from: to, to: from }
                    : { from, to }
                  : value && typeof value === "object" && "from" in value
                    ? value
                    : undefined
              }
              showOutsideDays
              today={today}
            />
          )}
        </Box>
        {type === "datetime-local" && mode == "single" && (
          <Flex gap="8" mt="8">
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
            <Text color="fg.tertiary" fontSize="sm" textAlign="center" w="full">
              {toTimeZoneName(value instanceof Date ? value : new Date())}
            </Text>
          </Flex>
        )}
        {mode === "range" && (
          <InputRoot mt="8" px="8" role="group">
            <InputControl asChild {...styles.date()}>
              <input
                aria-label="Start date"
                onBlur={(event) => {
                  const date = toInstant(event.target.value);
                  if (!date) {
                    return;
                  }

                  if (!(value && typeof value === "object" && "to" in value)) {
                    setFrom(undefined);
                    setValue({ from: date, to: toEndOfDay(date) });
                  }
                }}
                onChange={(event) => {
                  const date = toInstant(event.target.value);
                  if (!date) {
                    return;
                  }

                  if (value && typeof value === "object" && "to" in value) {
                    setValue({ ...value, from: date });
                  } else if (to) {
                    setTo(undefined);
                    setValue({ from: date, to: toEndOfDay(to) });
                  } else {
                    setFrom(date);
                  }
                }}
                type="date"
                value={
                  from
                    ? toPlainDate(from)
                    : value && typeof value === "object" && "from" in value
                      ? toPlainDate(value.from)
                      : ""
                }
              />
            </InputControl>
            <Box aria-hidden {...styles.separator()}>
              -
            </Box>
            <InputControl asChild {...styles.date({ position: "end" })}>
              <input
                aria-label="End date"
                onBlur={(event) => {
                  const date = toInstant(event.target.value);
                  if (!date) {
                    return;
                  }

                  if (
                    !(value && typeof value === "object" && "from" in value)
                  ) {
                    setTo(undefined);
                    setValue({ from: date, to: date });
                  }
                }}
                onChange={(event) => {
                  const date = toInstant(event.target.value);
                  if (!date) {
                    return;
                  }

                  if (from) {
                    setFrom(undefined);
                    setValue({ from, to: toEndOfDay(date) });
                  } else if (
                    value &&
                    typeof value === "object" &&
                    "from" in value
                  ) {
                    setValue({ ...value, to: toEndOfDay(date) });
                  } else {
                    setTo(date);
                  }
                }}
                type="date"
                value={
                  value && typeof value === "object" && "to" in value
                    ? toPlainDate(value.to)
                    : to
                      ? toPlainDate(to)
                      : ""
                }
              />
            </InputControl>
          </InputRoot>
        )}
      </Flex>
    );
  },
);

Calendar.displayName = "@optiaxiom/react/Calendar";

const toEndOfDay = (date: Date) => {
  const newDate = toInstant(toPlainDate(date) + "T23:59:59.999");
  if (!newDate) {
    throw new Error(`Could not get end of day (${date.toISOString()})`);
  }
  return newDate;
};
