import { useComposedRefs, useControllableState } from "radix-ui/internal";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Button } from "../button";
import { Calendar } from "../calendar";
import { useObserveValue } from "../hooks";
import { IconCalendar } from "../icons/IconCalendar";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "../popover";
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
      className,
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
    const [month, setMonth] = useState(instant ?? undefined);

    const maxDate = max ? toInstant(max) : undefined;
    const minDate = min ? toInstant(min) : undefined;

    return (
      <Popover onOpenChange={setOpen} open={!disabled && open}>
        <PopoverAnchor>
          <Input
            addonAfter={
              value &&
              !props.required && (
                <Button
                  appearance="subtle"
                  aria-label="Clear"
                  icon={<IconX />}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    forceValueChange("");
                  }}
                  tabIndex={-1}
                  {...styles.clear()}
                />
              )
            }
            addonBefore={
              <PopoverTrigger
                aria-label="Show date picker"
                asChild
                hasCustomAnchor
                ref={pickerRef}
                role="img"
                {...styles.picker()}
              >
                <IconCalendar />
              </PopoverTrigger>
            }
            asChild
            disabled={disabled}
            max={max}
            min={min}
            onChange={(event) => {
              onChange?.(event);
              setValue(event.target.value);
              setMonth(toInstant(event.target.value));
            }}
            onClick={(e) => {
              if (CSS.supports("selector(::-webkit-datetime-edit)")) {
                e.preventDefault();
              }
            }}
            onKeyDown={(e) => {
              if (CSS.supports("selector(::-webkit-datetime-edit)")) {
                if (e.key === " ") {
                  e.preventDefault();
                  setOpen(true);
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setOpen(false);
                }
              }
            }}
            ref={ref}
            step={step}
            type={type}
            {...styles.date({}, className)}
            {...props}
          >
            <input {...styles.input()} />
          </Input>
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
            month={month}
            onMonthChange={setMonth}
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
          {type === "datetime-local" && (
            <Button
              flex="none"
              justifyContent="center"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
