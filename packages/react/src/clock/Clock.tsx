import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { Select } from "../select";
import { SelectContent } from "../select-content";
import { SelectRadioItem } from "../select-radio-item";
import { SelectTrigger } from "../select-trigger";
import { format, parse, range } from "./utils";

type ClockProps = BoxProps<
  "div",
  {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    step?: number | string;
    value?: string;
  }
>;

export const Clock = forwardRef<HTMLDivElement, ClockProps>(
  (
    { defaultValue, onValueChange, step = "60", value: valueProp, ...props },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
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
          items={hours}
          onValueChange={(hour) =>
            hour && setValue(format({ ...parsed, hour }))
          }
          value={parsed.hour}
        >
          <SelectTrigger aria-label="Select hour" flex="1" placeholder="HH" />
          <SelectContent>
            {hours.map((hour) => (
              <SelectRadioItem item={hour} key={hour}>
                {hour}
              </SelectRadioItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={minutes}
          onValueChange={(minute) =>
            minute && setValue(format({ ...parsed, minute }))
          }
          value={parsed.minute}
        >
          <SelectTrigger aria-label="Select minute" flex="1" placeholder="MM" />
          <SelectContent>
            {minutes.map((minute) => (
              <SelectRadioItem
                aria-label={`${parseInt(minute)}`}
                item={minute}
                key={minute}
              >
                {minute}
              </SelectRadioItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={periods}
          onValueChange={(meridiem) =>
            meridiem && setValue(format({ ...parsed, meridiem }))
          }
          value={parsed.meridiem}
        >
          <SelectTrigger
            aria-label="Select AM or PM"
            flex="1"
            placeholder="--"
          />
          <SelectContent>
            {periods.map((meridiem) => (
              <SelectRadioItem item={meridiem} key={meridiem}>
                {meridiem}
              </SelectRadioItem>
            ))}
          </SelectContent>
        </Select>
      </Flex>
    );
  },
);

Clock.displayName = "@optiaxiom/react/Clock";
