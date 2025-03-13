import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { Calendar } from "../calendar";
import { Clock } from "../clock";
import { useDatePickerContext } from "../date-picker-context";
import { Flex } from "../flex";
import { PopoverContent } from "../popover-content";
import { usePopoverContext } from "../popover-context";
import { Separator } from "../separator";
import { Text } from "../text";
import { toLocalDate } from "../utils";
import * as styles from "./DatePickerContent.css";

type DatePickerContentProps = ComponentPropsWithoutRef<typeof PopoverContent> &
  Pick<
    ComponentPropsWithoutRef<typeof Calendar>,
    "holiday" | "max" | "min" | "today" | "weekend"
  > & {
    /**
     * Display content inside the popover after the calendar.
     */
    addonAfter?: ReactNode;
    /**
     * Display content inside the popover before the calendar.
     */
    addonBefore?: ReactNode;
  };

export const DatePickerContent = forwardRef<
  HTMLInputElement,
  DatePickerContentProps
>(
  (
    {
      addonAfter,
      addonBefore,
      children,
      holiday,
      max,
      min,
      today,
      weekend,
      ...props
    },
    ref,
  ) => {
    const { open } = usePopoverContext("DatePickerContent");
    const { setValue, step, type, value } =
      useDatePickerContext("DatePickerContent");

    const [height, setHeight] = useState<"lg" | "sm">("sm");

    const [time, setTime] = useState<string>();
    useEffect(() => {
      setTime(
        type === "date"
          ? "00:00"
          : formatTime(value ?? new Date(), parseInt(step) / 60),
      );
    }, [open, step, type, value]);

    return (
      <PopoverContent gap="8" maxW={undefined} ref={ref} {...props}>
        <Flex {...styles.panels({ height })}>
          {addonBefore}
          <Calendar
            alignSelf="start"
            holiday={holiday}
            max={max}
            min={min}
            onHeightChange={(height) => {
              setHeight(height > 300 ? "lg" : "sm");
            }}
            onValueChange={(value) =>
              setValue(
                value
                  ? new Date(formatDate(value) + "T" + (time ?? "00:00"))
                  : undefined,
              )
            }
            today={today}
            value={value}
            weekend={weekend}
          />
          {addonAfter}
        </Flex>
        {type === "datetime-local" && (
          <Flex gap="8">
            <Separator mb="8" />
            <Clock
              onValueChange={(time) => {
                setTime(time);
                if (value) {
                  setValue(new Date(formatDate(value) + "T" + time));
                }
              }}
              step={step}
              value={time}
            />
            <Text color="fg.tertiary" fontSize="sm" w="full">
              {(value ?? new Date()).toTimeString().slice(9)}
            </Text>
          </Flex>
        )}
        {children}
      </PopoverContent>
    );
  },
);

DatePickerContent.displayName = "@optiaxiom/react/DatePickerContent";

function formatDate(date: Date) {
  return toLocalDate(date).split("T")[0];
}

function formatTime(date: Date, step = 1) {
  const [hour, minute] = toLocalDate(date).split("T")[1].slice(0, 5).split(":");
  return (
    hour +
    ":" +
    (Math.floor(parseInt(minute) / step) * step).toString().padStart(2, "0")
  );
}
