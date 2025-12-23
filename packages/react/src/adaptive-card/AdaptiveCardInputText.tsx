import type { InputTextElement } from "./types";

import { Field } from "../field";
import { Input } from "../input";

export type AdaptiveCardInputTextProps = {
  /**
   * The text input element configuration
   */
  element: InputTextElement;
  /**
   * Callback function when the text value changes
   */
  onChange: (id: string, value: unknown) => void;
  /**
   * Current text value
   */
  value: string;
};

export function AdaptiveCardInputText({
  element,
  onChange,
  value,
}: AdaptiveCardInputTextProps) {
  return (
    <Field
      inputId={element.id}
      label={element.label}
      required={element.isRequired}
    >
      <Input
        maxLength={element.maxLength}
        onChange={(e) => onChange(element.id, e.target.value)}
        placeholder={element.placeholder}
        required={element.isRequired}
        value={value || ""}
      />
    </Field>
  );
}

AdaptiveCardInputText.displayName = "@optiaxiom/react/AdaptiveCardInputText";
