import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { RadioGroupContextProvider } from "../radio-group-context";
import { mapResponsiveValue } from "../sprinkles";

type InputProps = ComponentPropsWithoutRef<"input">;
type RadioGroupProps = BoxProps<
  "div",
  {
    defaultValue?: string;
    disabled?: InputProps["disabled"];
    name?: InputProps["name"];
    onBlur?: InputProps["onBlur"];
    onChange?: InputProps["onChange"];
    onValueChange?: (value: string) => void;
    value?: string;
  }
>;

const mapGapToOrientation = {
  column: "sm",
  "column-reverse": "sm",
  row: "md",
  "row-reverse": "md",
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
      <RadioGroupContextProvider
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
          gap={mapResponsiveValue(
            flexDirection,
            (value) => mapGapToOrientation[value],
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Flex>
      </RadioGroupContextProvider>
    );
  },
);

RadioGroup.displayName = "@optiaxiom/react/RadioGroup";
