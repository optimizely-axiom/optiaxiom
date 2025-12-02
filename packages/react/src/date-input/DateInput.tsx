import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Button } from "../button";
import { Calendar } from "../calendar";
import { useFieldContext } from "../field/internals";
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
import {
  type ExtendProps,
  toInstant,
  toPlainDate,
  toPlainDateTime,
} from "../utils";
import { VisuallyHidden } from "../visually-hidden";
import * as styles from "./DateInput.css";

export type DateInputProps = ExtendProps<
  ComponentPropsWithoutRef<typeof Input>,
  Pick<
    ComponentPropsWithoutRef<typeof Calendar>,
    "holiday" | "placeholder" | "weekend"
  > & {
    /**
     * The default date and time to use in the calendar picker when no value has
     * been selected.
     *
     * **NOTE:** This is NOT a placeholder hint text for the input field. Native
     * date inputs do not support placeholder text. The value format must be an
     * Instant, PlainDate, PlainDateTime, or PlainTime (e.g., "2024-01-01",
     * "2024-01-01T12:00", "12:00").
     *
     * @example
     * // Set default time to noon when picking dates
     * <DateInput placeholder="12:00" />
     *
     * // Set default date to a specific date
     * <DateInput placeholder="2024-01-01" />
     */
    placeholder?: string;
    /**
     * Control whether the input allows only date or both date and time.
     */
    type?: "date" | "datetime-local";
  }
>;

/**
 * Input field with calendar that lets user enter dates.
 *
 * Important Notes:
 * - The `placeholder` prop sets the default date/time in the calendar picker,
 *   NOT hint text for the input field (native date inputs don't support that)
 * - Don't use `addonBefore` as it will override the calendar icon that opens
 *   the date picker popover
 *
 * @category form
 * @category date
 * @since 1.4.0
 */
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      className,
      disabled,
      holiday,
      max: maxProp,
      min: minProp,
      onChange,
      placeholder,
      step,
      type = "date",
      weekend,
      ...props
    },
    outerRef,
  ) => {
    const { labelId: fieldLabelId } = useFieldContext(
      "@optiaxiom/react/DateInput",
    );
    const labelId = useId();

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

    const max = maxProp || "2100-12-31";
    const min = minProp || "1900-01-01";
    const maxDate = max ? toInstant(max) : undefined;
    const minDate = min ? toInstant(min) : undefined;

    return (
      <Popover onOpenChange={setOpen} open={!disabled && open}>
        <PopoverAnchor>
          <Input
            addonAfter={
              value &&
              !props.readOnly &&
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
                onClick={(event) => {
                  if (props.readOnly) {
                    event.preventDefault();
                  }
                }}
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
                  if (!props.readOnly) {
                    setOpen(true);
                  }
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
          aria-labelledby={clsx(labelId, fieldLabelId)}
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
          <VisuallyHidden asChild id={labelId}>
            <h2>Calendar</h2>
          </VisuallyHidden>
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
            placeholder={placeholder}
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
