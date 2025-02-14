import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Button } from "../button";
import { Calendar } from "../calendar";
import { Flex } from "../flex";
import { IconCalendar } from "../icons/IconCalendar";
import { Input } from "../input";
import { Popover } from "../popover";
import { PopoverAnchor } from "../popover-anchor";
import { PopoverContent } from "../popover-content";
import { PopoverTrigger } from "../popover-trigger";
import { forceValueChange } from "../utils";
import * as styles from "./DateInput.css";
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

    return (
      <Popover onOpenChange={setOpen} open={!disabled && open}>
        <PopoverAnchor>
          <Input
            addonAfter={
              !disabled && (
                <PopoverTrigger
                  appearance="subtle"
                  aria-label="Show date picker"
                  icon={<IconCalendar />}
                  size="sm"
                  {...styles.picker()}
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
              if (
                e.key === " " &&
                CSS.supports("selector(::-webkit-datetime-edit)")
              ) {
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
          gap="8"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            innerRef.current?.focus();
          }}
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
          <Flex flexDirection="row">
            <Button
              appearance="subtle"
              onClick={() => {
                if (innerRef.current) {
                  forceValueChange(innerRef.current, "");
                }

                setOpen(false);
              }}
            >
              Clear
            </Button>
          </Flex>
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
