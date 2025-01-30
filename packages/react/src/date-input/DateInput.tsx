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
import { forceValueChange } from "../utils";
import { useCalendarSupported } from "./useCalendarSupported";
import { format, parse } from "./utils";

type DateInputProps = ComponentPropsWithoutRef<typeof Input>;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ disabled, max, min, onChange, ...props }, outerRef) => {
    const [open, setOpen] = useState(false);

    const [value, setValue] = useControllableState({
      defaultProp: props.defaultValue,
      prop: props.value,
    });

    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const maxDate = max ? new Date(max) : undefined;
    const minDate = min ? new Date(min) : undefined;

    const supported = useCalendarSupported();
    if (supported === null) {
      return null;
    } else if (!supported) {
      return (
        <Input
          disabled={disabled}
          max={max}
          min={min}
          onChange={onChange}
          ref={ref}
          type="date"
          {...props}
        />
      );
    }

    return (
      <Popover onOpenChange={setOpen} open={!disabled && open}>
        <PopoverAnchor>
          <Input
            addonBefore={
              !disabled && (
                <PopoverTrigger
                  appearance="subtle"
                  aria-label="Show date picker"
                  icon={<IconCalendar />}
                  size="sm"
                />
              )
            }
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
            type="date"
            {...props}
          />
        </PopoverAnchor>
        <PopoverContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            innerRef.current?.focus();
          }}
          p="0"
        >
          <Calendar
            max={maxDate}
            min={minDate}
            onValueChange={(date) => {
              if (!date) {
                return;
              }

              if (innerRef.current) {
                forceValueChange(innerRef?.current, format(date));
              }
              setOpen(false);
            }}
            value={parse(value)}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
