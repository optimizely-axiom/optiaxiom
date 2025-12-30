import type { InputNumberElement } from "./types";

import { Field } from "../field";
import { Input } from "../input";

export type AdaptiveCardInputNumberProps = {
  /**
   * The number input element configuration
   */
  element: InputNumberElement;
  /**
   * Callback function when the number value changes
   */
  onChange: (id: string, value: unknown) => void;
  /**
   * Current number value
   */
  value: number;
};

export function AdaptiveCardInputNumber({
  element,
  onChange,
  value,
}: AdaptiveCardInputNumberProps) {
  return (
    <Field
      inputId={element.id}
      label={element.label}
      required={element.isRequired}
    >
      <Input
        max={element.max}
        maxLength={element.maxLength}
        min={element.min}
        onChange={(e) => onChange(element.id, e.target.valueAsNumber)}
        placeholder={element.placeholder}
        required={element.isRequired}
        type="number"
        value={value ?? ""}
      />
    </Field>
  );
}

AdaptiveCardInputNumber.displayName =
  "@optiaxiom/react/AdaptiveCardInputNumber";
