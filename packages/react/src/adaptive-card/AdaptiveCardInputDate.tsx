import type { InputDateElement } from "./types";

import { DateInput } from "../date-input";
import { Field } from "../field";

export type AdaptiveCardInputDateProps = {
  /**
   * The date input element configuration
   */
  element: InputDateElement;
  /**
   * Callback function when the date value changes
   */
  onChange: (id: string, value: unknown) => void;
  /**
   * Current date value
   */
  value: string;
};

export function AdaptiveCardInputDate({
  element,
  onChange,
  value,
}: AdaptiveCardInputDateProps) {
  return (
    <Field
      inputId={element.id}
      label={element.label}
      required={element.isRequired}
    >
      <DateInput
        onChange={(newValue) => onChange(element.id, newValue)}
        required={element.isRequired}
        value={value}
      />
    </Field>
  );
}

AdaptiveCardInputDate.displayName = "@optiaxiom/react/AdaptiveCardInputDate";
