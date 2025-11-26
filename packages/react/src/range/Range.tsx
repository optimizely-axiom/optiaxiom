import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import { forwardRef, useRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useFieldContext } from "../field/FieldContext";
import { Tooltip } from "../tooltip";
import * as styles from "./Range.css";
import { useTooltipState } from "./useTooltipState";

export type RangeProps = BoxProps<
  "input",
  Omit<NonNullable<styles.RangeVariants>, "marks"> & {
    /**
     * The initial selected value in uncontrolled mode.
     */
    defaultValue?: number;
    /**
     * Whether the input is disabled and in read only mode.
     */
    disabled?: boolean;
    /**
     * Function to format the label for each value.
     */
    getLabel?: (value: number) => string;
    /**
     * The marks to display on the range steps.
     */
    marks?: Array<
      | number
      | {
          /**
           * The label for the mark.
           */
          label: string;
          /**
           * The value for the mark.
           */
          value: number;
        }
    >;
    /**
     * The maximum value for the range.
     */
    max?: number;
    /**
     * The minimum value for the range.
     */
    min?: number;
    /**
     * Handler that is called when the value changes.
     */
    onValueChange?: (value: number) => void;
    /**
     * Whether to show a tooltip with the current value above the thumb.
     */
    showTooltip?: boolean;
    /**
     * The stepping interval for the range.
     */
    step?: number;
    /**
     * The selected value in controlled mode.
     */
    value?: number;
  }
>;

/**
 * Allow users to select a numeric value within a range.
 *
 * @since 1.7.12
 * @experimental
 */
export const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    {
      className,
      defaultValue = 0,
      disabled,
      getLabel = (value) => value,
      marks,
      max = 100,
      min = 0,
      onChange,
      onValueChange,
      showTooltip = false,
      size = "md",
      step = 1,
      value: valueProp,
      ...props
    },
    ref,
  ) => {
    const { boxProps, restProps } = extractBoxProps(props);

    const { descriptionId, error, errorId, inputId } = useFieldContext(
      "@optiaxiom/react/Range",
    );

    const [value, setValue] = useControllableState({
      caller: "@optiaxiom/react/Range",
      defaultProp: defaultValue,
      onChange: onValueChange,
      prop: valueProp,
    });
    const fillValue = `${(value - min) / (max - min)}`;

    const [tooltipOpen, setTooltipOpen] = useTooltipState();
    const isPointerInsideRef = useRef(false);

    return (
      <Box
        data-disabled={disabled ? "" : undefined}
        {...styles.root({ marks: !!marks, size }, className)}
        {...boxProps}
      >
        <Box
          style={assignInlineVars({
            [styles.fillValue]: fillValue,
          })}
          {...styles.track()}
        >
          <Box {...styles.range()} />

          <Tooltip
            content={getLabel(value)}
            disabled={disabled || !showTooltip}
            disableHoverableContent
            open={tooltipOpen}
          >
            <Box {...styles.thumb()} />
          </Tooltip>

          <Box
            aria-describedby={
              errorId || descriptionId
                ? clsx(errorId, descriptionId)
                : undefined
            }
            aria-disabled={disabled}
            aria-invalid={error ? true : undefined}
            asChild
            id={inputId}
            ref={ref}
            {...styles.control()}
          >
            <input
              disabled={disabled}
              max={max}
              min={min}
              onBlur={() => {
                if (isPointerInsideRef.current) {
                  return;
                }
                setTooltipOpen(false);
              }}
              onChange={(event) => {
                setValue(Number(event.currentTarget.value));
                onChange?.(event);
              }}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) {
                  setTooltipOpen(true);
                }
              }}
              onKeyDown={() => {
                setTooltipOpen(true);
              }}
              onPointerLeave={(event) => {
                isPointerInsideRef.current = false;
                if (!event.currentTarget.matches(":focus-visible")) {
                  setTooltipOpen(false);
                }
              }}
              onPointerMove={() => {
                isPointerInsideRef.current = true;
                setTooltipOpen(true, true);
              }}
              step={step}
              type="range"
              value={value}
              {...restProps}
            />
          </Box>
        </Box>

        {marks
          ?.map((mark) =>
            typeof mark === "number"
              ? {
                  label: getLabel(mark),
                  value: mark,
                }
              : mark,
          )
          .map((mark) => (
            <Box
              key={mark.value}
              onClick={() => {
                if (!disabled) {
                  setValue(mark.value);
                }
              }}
              style={assignInlineVars({
                [styles.markValue]: `${(mark.value - min) / (max - min)}`,
              })}
              {...styles.mark({ active: value >= mark.value })}
            >
              {mark.label}
            </Box>
          ))}
      </Box>
    );
  },
);

Range.displayName = "@optiaxiom/react/Range";
