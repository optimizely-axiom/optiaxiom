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
import {
  type ExtendProps,
  forceValueChange,
  toPlainDate,
  toPlainDateTime,
} from "../utils";
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

    const [value, setValue] = useControllableState({
      defaultProp: props.defaultValue,
      prop: props.value,
    });
    const instant =
      typeof value === "string"
        ? toInstant(value.includes("T") ? value : value + "T00:00")
        : undefined;

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

              if (innerRef.current) {
                forceValueChange(
                  innerRef?.current,
                  type === "datetime-local"
                    ? toPlainDateTime(date)
                    : toPlainDate(date),
                );
              }
              if (type === "date") {
                setOpen(false);
              }
            }}
            step={step}
            type={type}
            value={instant}
            weekend={weekend}
          />
          <Flex flexDirection="row" justifyContent="space-between">
            <Button
              onClick={() => {
                if (innerRef.current) {
                  forceValueChange(innerRef.current, "");
                }

                if (type === "date") {
                  setOpen(false);
                }
              }}
            >
              Clear
            </Button>

            {type === "datetime-local" && (
              <Button appearance="primary" onClick={() => setOpen(false)}>
                Done
              </Button>
            )}
          </Flex>
        </PopoverContent>
      </Popover>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
