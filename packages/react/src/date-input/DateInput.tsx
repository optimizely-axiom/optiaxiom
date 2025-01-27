import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Calendar } from "../calendar";
import { IconCalendar } from "../icons/IconCalendar";
import { Input } from "../input";
import { Popover } from "../popover";
import { PopoverAnchor } from "../popover-anchor";
import { PopoverContent } from "../popover-content";
import { PopoverTrigger } from "../popover-trigger";
import { forceValueChange } from "../search-input";

type DateInputProps = ComponentPropsWithoutRef<typeof Input>;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    { defaultValue, disabled, max, min, onChange, value: valueProp, ...props },
    outerRef,
  ) => {
    const [open, setOpen] = useState(false);

    const [value, setValue] = useControllableState({
      defaultProp: defaultValue ?? "",
      prop: valueProp,
    });

    const dateValue =
      value && typeof value === "string" ? new Date(value) : undefined;

    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const maxDate = max ? new Date(max) : undefined;
    const minDate = min ? new Date(min) : undefined;

    const handleDateChange = (date: Date) => {
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
      );
      if (innerRef.current) {
        forceValueChange(
          innerRef?.current,
          utcDate.toISOString().split("T")[0],
        );
      }
      setOpen(false);
    };

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverAnchor>
          <Input
            addonAfter={
              <PopoverTrigger
                appearance="subtle"
                aria-label="toggle calendar"
                disabled={disabled}
                icon={<IconCalendar />}
                size="sm"
              />
            }
            addonPointerEvents="none"
            disabled={disabled}
            max={max}
            min={min}
            onChange={(event) => {
              onChange?.(event);
              setValue(event.target.value);
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
                setOpen(true);
              }
            }}
            ref={ref}
            value={value}
            {...props}
            type="date"
          />
        </PopoverAnchor>
        <PopoverContent p="0">
          <Calendar
            defaultValue={dateValue}
            max={maxDate}
            min={minDate}
            onValueChange={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
