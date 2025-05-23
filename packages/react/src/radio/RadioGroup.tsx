import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { mapResponsiveValue } from "../sprinkles";
import { RadioGroupProvider } from "./RadioGroupContext";

export type RadioGroupProps = BoxProps<
  "div",
  {
    /**
     * The initial selected value in uncontrolled mode.
     */
    defaultValue?: string;
    /**
     * Whether the input is disabled and in read only mode.
     */
    disabled?: InputProps["disabled"];
    /**
     * The name of the form control elements. Will override any name specified on the inner Radio components.
     */
    name?: InputProps["name"];
    /**
     * Handler for `blur` event forwarded to all inner Radio components.
     *
     * Useful for integrating with third party form libraries.
     */
    onBlur?: InputProps["onBlur"];
    /**
     * Handler for `change` event forwarded to all inner Radio components.
     *
     * Useful for integrating with third party form libraries.
     */
    onChange?: InputProps["onChange"];
    /**
     * Handler that is called when the selected value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * The selected value in controlled mode.
     */
    value?: string;
  }
>;
type InputProps = ComponentPropsWithoutRef<"input">;

const mapGapToOrientation = {
  column: "12",
  "column-reverse": "12",
  row: "16",
  "row-reverse": "16",
} as const;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      defaultValue,
      disabled,
      flexDirection = "column",
      name,
      onBlur,
      onChange,
      onValueChange,
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <RadioGroupProvider
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={(event) => {
          onChange?.(event);
          onValueChange?.(event.target.value);
        }}
        value={value}
      >
        <Flex
          flexDirection={flexDirection}
          fontSize="md"
          gap={mapResponsiveValue(
            flexDirection,
            (value) => mapGapToOrientation[value],
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Flex>
      </RadioGroupProvider>
    );
  },
);

RadioGroup.displayName = "@optiaxiom/react/RadioGroup";
