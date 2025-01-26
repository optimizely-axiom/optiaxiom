import { type ComponentPropsWithRef, forwardRef, useState } from "react";

import { Calendar } from "../calendar";
import { IconAngleDown } from "../icons/IconAngleDown";
import { IconCalendar } from "../icons/IconCalendar";
import { Input } from "../input";
import { Popover } from "../popover";
import { PopoverAnchor } from "../popover-anchor";
import { PopoverContent } from "../popover-content";
import { PopoverTrigger } from "../popover-trigger";

type DateInputProps = ComponentPropsWithoutRef<typeof Input>;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    { defaultValue, disabled, max, min, onChange, value: valueProp, ...props },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [innerValue, setValue] = useState(defaultValue);

    const value = typeof valueProp === "undefined" ? innerValue : valueProp;
    const dateValue =
      value && typeof value === "string" ? new Date(value) : undefined;

    const maxDate = max ? new Date(max) : undefined;
    const minDate = min ? new Date(min) : undefined;

    const handleDateChange = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const utcDate = new Date(Date.UTC(year, month, day));

      const formattedDate = utcDate.toISOString().split("T")[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange?.({ target: { value: formattedDate } } as any);
      setValue(formattedDate);
    };

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverAnchor>
          <Input
            addonAfter={
              <PopoverTrigger
                appearance="subtle"
                aria-label="toggle calendar"
                cursor="default"
                disabled={disabled}
                icon={<IconAngleDown />}
                size="sm"
              />
            }
            addonBefore={<IconCalendar />}
            addonPointerEvents="none"
            disabled={disabled}
            onChange={(event) => {
              onChange?.(event);
              setValue(event.target.value);
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
            autoFocus
            defaultValue={dateValue}
            max={maxDate}
            min={minDate}
            onValueChange={(date) => {
              handleDateChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
