import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Select, SelectContent, SelectTrigger } from "../select";
import { format, parse, range } from "./utils";

export type ClockProps = BoxProps<
  "div",
  {
    /**
     * The initial time value in uncontrolled mode.
     */
    defaultValue?: string;
    /**
     * Handler that is called when the time value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Specify the stepping value in seconds for the allowed values.
     */
    step?: number | string;
    /**
     * The time value in controlled mode in 24-hour HH:mm format.
     */
    value?: string;
  }
>;

export const Clock = forwardRef<HTMLDivElement, ClockProps>(
  (
    {
      defaultValue = "",
      onValueChange,
      step = "60",
      value: valueProp,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/Clock",
      defaultProp: defaultValue,
      onChange: onValueChange,
      prop: valueProp,
    });
    const stepInMinutes =
      (typeof step === "string" ? parseInt(step) : step) / 60;
    const parsed = parse(value, stepInMinutes);

    const hours = range(1, 12);
    const minutes = range(0, 59, stepInMinutes).map((minute) =>
      minute.padStart(2, "0"),
    );
    const periods = ["AM" as const, "PM" as const];

    return (
      <Flex flexDirection="row" gap="4" ref={ref} {...props}>
        <Select
          onValueChange={(hour) =>
            hour && setValue(format({ ...parsed, hour }))
          }
          options={hours.map((hour) => ({ label: hour, value: hour }))}
          value={parsed.hour}
        >
          <SelectTrigger aria-label="Select hour" flex="1" placeholder="HH" />
          <SelectContent />
        </Select>

        <Select
          onValueChange={(minute) =>
            minute && setValue(format({ ...parsed, minute }))
          }
          options={minutes.map((minute) => ({
            ariaLabel: `${parseInt(minute)}`,
            label: minute,
            value: minute,
          }))}
          value={parsed.minute}
        >
          <SelectTrigger aria-label="Select minute" flex="1" placeholder="MM" />
          <SelectContent />
        </Select>

        <Select
          onValueChange={(meridiem) =>
            (meridiem === "AM" || meridiem === "PM") &&
            setValue(format({ ...parsed, meridiem }))
          }
          options={periods.map((period) => ({ label: period, value: period }))}
          value={parsed.meridiem}
        >
          <SelectTrigger
            aria-label="Select AM or PM"
            flex="1"
            placeholder="--"
          />
          <SelectContent />
        </Select>
      </Flex>
    );
  },
);

Clock.displayName = "@optiaxiom/react/Clock";
