import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

import { Group } from "../group";
import { mapResponsiveValue } from "../sprinkles";
import { useSurface } from "../surface";
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

/**
 * Basic control to allow selecting only one item from a set.
 *
 * Important Notes:
 * - The control and its focus ring reach up to 6px outside each radio, so a
 *   scroll container (`overflow="auto"`) clips them on its edge rows. Pad the
 *   scroll container by at least 6px (`p="8"`); to keep the radios flush with
 *   the content around it, cancel the padding with an equal negative margin.
 *
 * @category form
 * @since 0.1.0
 */
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
    const surface = useSurface("property");
    const { track } = surface ?? {};

    return (
      <RadioGroupProvider
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={(event) => {
          const newValue = event.target.value;
          onChange?.(event);
          onValueChange?.(newValue);

          track?.({
            name: "changed",
            value: newValue,
          });
        }}
        value={value}
      >
        <Group
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
        </Group>
      </RadioGroupProvider>
    );
  },
);

RadioGroup.displayName = "@optiaxiom/react/RadioGroup";
