import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useState,
} from "react";
import { DayPicker, type Matcher } from "react-day-picker";

import { Box, type BoxProps } from "../box";
import { Clock } from "../clock";
import { Flex } from "../flex";
import { usePopoverContentContext } from "../popover/internals";
import { Text } from "../text";
import { toInstant, toPlainDate, toPlainTime } from "../utils";
import * as styles from "./Calendar.css";
import { CalendarCaptionLabel } from "./CalendarCaptionLabel";
import { CalendarChevron } from "./CalendarChevron";
import { CalendarProvider } from "./CalendarContext";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayButton } from "./CalendarDayButton";
import { CalendarMonthCaption } from "./CalendarMonthCaption";
import { CalendarMonthGrid } from "./CalendarMonthGrid";
import { CalendarMonths } from "./CalendarMonths";
import { CalendarNextMonthButton } from "./CalendarNextMonthButton";
import { CalendarPreviousMonthButton } from "./CalendarPreviousMonthButton";
import { CalendarWeek } from "./CalendarWeek";
import { CalendarWeekday } from "./CalendarWeekday";
import { CalendarWeekdays } from "./CalendarWeekdays";
import { toTimeZoneName } from "./toTimeZoneName";

export type CalendarProps = BoxProps<
  "div",
  Pick<ComponentPropsWithoutRef<typeof DayPicker>, "today"> & {
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
  CaptionLabel: CalendarCaptionLabel,
  Chevron: CalendarChevron,
  Day: CalendarDay,
  DayButton: CalendarDayButton,
  MonthCaption: CalendarMonthCaption,
  MonthGrid: CalendarMonthGrid,
  Months: CalendarMonths,
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
      onDateSelect,
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

    const [view, setView] = useState<"day" | "month" | "year">("day");
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

    const [month, setMonth] = useState(
      value && typeof value === "object" && "from" in value
        ? value.from
        : value instanceof Date
          ? value
          : (today ?? new Date()),
    );

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [from, setFrom] = useState<Date>();
    const [to, setTo] = useState<Date>();

    return (
      <CalendarProvider
        month={month}
        setMonth={setMonth}
        setTo={setTo}
        setView={setView}
        view={view}
      >
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
                components={components}
                disabled={[
                  ...(min ? [{ before: min }] : []),
                  ...(max ? [{ after: max }] : []),
                ]}
                mode="single"
                modifiers={{ holiday, weekend }}
                month={month}
                navLayout="after"
                onMonthChange={setMonth}
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
                components={components}
                disabled={[
                  ...(min ? [{ before: min }] : []),
                  ...(max ? [{ after: max }] : []),
                ]}
                fixedWeeks
                mode="range"
                modifiers={{ holiday, weekend }}
                month={month}
                navLayout="after"
                onMonthChange={setMonth}
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
                    if (newFrom) {
                      onDateSelect?.(newFrom);
                    }
                  } else {
                    setFrom(undefined);
                    const start = to && to < from ? to : from;
                    const end =
                      to && to < from
                        ? toInstant(toPlainDate(from) + "T23:59:59.999")
                        : to
                          ? toInstant(toPlainDate(to) + "T23:59:59.999")
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
              <Text
                color="fg.tertiary"
                fontSize="sm"
                textAlign="center"
                w="full"
              >
                {toTimeZoneName(value instanceof Date ? value : new Date())}
              </Text>
            </Flex>
          )}
        </Flex>
      </CalendarProvider>
    );
  },
);

Calendar.displayName = "@optiaxiom/react/Calendar";
