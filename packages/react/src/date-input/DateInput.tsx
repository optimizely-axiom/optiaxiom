import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Popper, PopperAnchor, PopperContent } from "@radix-ui/react-popper";
import { Portal } from "@radix-ui/react-portal";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useRef,
  useState,
} from "react";

import { Button } from "../button";
import { Calendar } from "../calendar";
import { useObserveValue } from "../hooks";
import { Icon } from "../icon";
import { IconCalendar } from "../icons/IconCalendar";
import { IconX } from "../icons/IconX";
import { Input } from "../input";
import { ModalLayer } from "../modal";
import { ModalListbox } from "../overlay-listbox";
import { TransitionGroup } from "../transition";
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
      <Popper>
        <PopperAnchor>
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
              <Icon
                asChild
                onPointerDown={(event) => {
                  if (document.activeElement === innerRef.current) {
                    event.preventDefault();
                    setOpen(true);
                  }
                }}
                {...styles.picker()}
              >
                <IconCalendar />
              </Icon>
            }
            addonPointerEvents="none"
            asChild
            disabled={disabled}
            max={max}
            min={min}
            onBlur={() => setOpen(false)}
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
            onFocus={() => {
              if (CSS.supports("selector(::-webkit-datetime-edit)")) {
                setOpen(true);
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
        </PopperAnchor>
        <TransitionGroup open={!disabled && open}>
          <Portal asChild>
            <ModalLayer asChild>
              <ModalListbox
                asChild
                gap="8"
                minW="trigger"
                onFocus={(event) => event.target.blur()}
                onPointerDown={(event) => event.preventDefault()}
                p="16"
                provider="popper"
              >
                <PopperContent align="start" side="bottom" sideOffset={5}>
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
                        /**
                         * We blur and re-focus the input to make sure screen
                         * reader will read out the new date value rather than
                         * announce selection of date in calendar and exiting
                         * calendar dialog.
                         */
                        innerRef.current?.blur();
                        innerRef.current?.focus();

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
                </PopperContent>
              </ModalListbox>
            </ModalLayer>
          </Portal>
        </TransitionGroup>
      </Popper>
    );
  },
);

DateInput.displayName = "@optiaxiom/react/DateInput";
