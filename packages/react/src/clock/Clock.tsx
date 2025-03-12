import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { SegmentedControl } from "../segmented-control";
import { SegmentedControlItem } from "../segmented-control-item";
import * as styles from "./Clock.css";
import { format, parse, range } from "./utils";

type ClockProps = BoxProps<
  "div",
  {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    step?: string;
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
    const parsed = parse(value, parseInt(step) / 60);

    const hourRef = useRef<HTMLButtonElement>(null);
    const minuteRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      if (hourRef.current?.parentElement) {
        hourRef.current.parentElement.style.overflow = "hidden";
        hourRef.current?.scrollIntoView();
        hourRef.current.parentElement.style.overflow = "";
      }

      if (minuteRef.current?.parentElement) {
        minuteRef.current.parentElement.style.overflow = "hidden";
        minuteRef.current?.scrollIntoView();
        minuteRef.current.parentElement.style.overflow = "";
      }
    }, []);

    return (
      <Flex
        alignItems="stretch"
        flexDirection="row"
        gap="0"
        onKeyDown={(event) => {
          if (!(event.target instanceof HTMLButtonElement)) {
            return;
          }

          const parent = event.target.parentElement;
          if (!parent) {
            return;
          }

          const grandParent = parent.parentElement;
          if (!grandParent) {
            return;
          }

          const sibling =
            event.key === "ArrowRight"
              ? (parent.nextElementSibling ?? grandParent.firstElementChild)
              : event.key === "ArrowLeft"
                ? (parent.previousElementSibling ??
                  grandParent.lastElementChild)
                : undefined;
          if (!sibling) {
            return;
          }

          const focusable =
            sibling.querySelector('[tabindex="0"]') ??
            sibling.querySelector('[aria-checked="true"]');
          if (focusable instanceof HTMLButtonElement) {
            focusable.focus();
          }
        }}
        ref={ref}
        {...props}
      >
        <SegmentedControl
          aria-label="Select hour"
          loop
          onValueChange={(hour: string) =>
            hour && setValue(format({ ...parsed, hour }))
          }
          orientation="vertical"
          role="radiogroup"
          value={parsed.hour}
          {...styles.wheel()}
        >
          {range(1, 12).map((hour) => (
            <SegmentedControlItem
              appearance="subtle"
              flex="none"
              key={hour}
              ref={hour === parsed.hour ? hourRef : undefined}
              square
              value={hour}
            >
              {hour}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>

        <SegmentedControl
          aria-label="Select minute"
          loop
          onValueChange={(minute: string) =>
            minute && setValue(format({ ...parsed, minute }))
          }
          orientation="vertical"
          role="radiogroup"
          value={parsed.minute}
          {...styles.wheel()}
        >
          {range(0, 59, parseInt(step) / 60)
            .map((minute) => minute.padStart(2, "0"))
            .map((minute) => (
              <SegmentedControlItem
                appearance="subtle"
                aria-label={`${parseInt(minute)}`}
                flex="none"
                key={minute}
                ref={minute === parsed.minute ? minuteRef : undefined}
                square
                value={minute}
              >
                {minute}
              </SegmentedControlItem>
            ))}
        </SegmentedControl>

        <SegmentedControl
          aria-label="Select AM or PM"
          onValueChange={(meridiem: "" | "AM" | "PM") =>
            meridiem && setValue(format({ ...parsed, meridiem }))
          }
          orientation="vertical"
          role="radiogroup"
          value={parsed.meridiem}
          {...styles.wheel()}
        >
          {["AM", "PM"].map((meridiem) => (
            <SegmentedControlItem
              appearance="subtle"
              flex="none"
              key={meridiem}
              square
              value={meridiem}
            >
              {meridiem}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </Flex>
    );
  },
);

Clock.displayName = "@optiaxiom/react/Clock";
