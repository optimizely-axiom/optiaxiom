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
import { useObserveValue } from "../hooks";
import { IconCalendar } from "../icons/IconCalendar";
import { Input } from "../input";
import { Popover } from "../popover";
import { PopoverAnchor, PopoverContent, PopoverTrigger } from "../popover";
import { type ExtendProps, toPlainDate, toPlainDateTime } from "../utils";
import * as styles from "./DateInput.css";
import { toInstant } from "./utils";

type DateInputProps = ExtendProps<
  ComponentPropsWithoutRef<typeof Input>,
  Pick<ComponentPropsWithoutRef<typeof Calendar>, "holiday" | "weekend"> & {
    type?: "date" | "datetime-local";
  }
>;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      disabled,
      holiday,
      max,
      min,
      onChange,
      step,
      type = "date",
      weekend,
      ...props
    },
    outerRef,
  ) => {
    const [open, setOpen] = useState(false);
    const hasInteractedOutsideRef = useRef(false);
    const pickerRef = useRef<HTMLButtonElement>(null);

    const innerRef = useRef<HTMLInputElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/DateInput",
      defaultProp: props.defaultValue,
      prop: props.value,
    });
    const forceValueChange = useObserveValue(innerRef, setValue);
    const instant =
      typeof value === "string" ? (toInstant(value) ?? null) : null;

    const maxDate = max ? toInstant(max) : undefined;
    const minDate = min ? toInstant(min) : undefined;

    return (
      <Popover onOpenChange={setOpen} open={!disabled && open}>
        <PopoverAnchor>
          <Input
            addonAfter={
              !disabled && (
                <PopoverTrigger
                  appearance="subtle"
                  aria-label="Show date picker"
                  hasCustomAnchor
                  icon={<IconCalendar />}
                  ref={pickerRef}
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
              if (CSS.supports("selector(::-webkit-datetime-edit)")) {
                e.preventDefault();
              }
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
            step={step}
            type={type}
            {...props}
          />
        </PopoverAnchor>
        <PopoverContent
          gap="8"
          onCloseAutoFocus={(event) => {
            if (hasInteractedOutsideRef.current) {
              hasInteractedOutsideRef.current = false;
            } else {
              event.preventDefault();
              innerRef.current?.focus();
            }
          }}
          onInteractOutside={(event) => {
            if (
              !(
                event.target instanceof Node &&
                pickerRef.current?.contains(event.target)
              )
            ) {
              hasInteractedOutsideRef.current = true;
            }
          }}
        >
          <Calendar
            holiday={holiday}
            max={maxDate}
            min={minDate}
            onValueChange={(date) => {
              if (!date) {
                return;
              }

              forceValueChange(
                type === "datetime-local"
                  ? toPlainDateTime(date)
                  : toPlainDate(date),
              );
              if (type === "date") {
                setOpen(false);
              }
            }}
            step={step}
            type={type}
            value={instant}
            weekend={weekend}
          />
          {(!props.required || type === "datetime-local") && (
            <Flex flexDirection="row" justifyContent="space-between">
              {!props.required && (
                <Button
                  onClick={() => {
                    forceValueChange("");
                    if (type === "date") {
                      setOpen(false);
                    }
                  }}
                >
                  Clear
                </Button>
              )}

              {type === "datetime-local" && (
                <Button appearance="primary" onClick={() => setOpen(false)}>
                  Done
                </Button>
              )}
            </Flex>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
