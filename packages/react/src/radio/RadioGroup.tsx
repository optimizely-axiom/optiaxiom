import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { mapResponsiveValue } from "../sprinkles";
import { RadioGroupProvider } from "./RadioGroupContext";

export type RadioGroupProps = BoxProps<
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
