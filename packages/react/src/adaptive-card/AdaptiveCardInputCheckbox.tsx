import type { InputCheckboxElement } from "./types";

import { Checkbox } from "../checkbox";
import { Field } from "../field";

export type AdaptiveCardInputCheckboxProps = {
  /**
   * The checkbox input element configuration
   */
  element: InputCheckboxElement;
  /**
   * Callback function when the checkbox selection changes
   */
  onChange: (id: string, value: unknown) => void;
  /**
   * Currently selected checkbox values
   */
  value: string[];
};

export function AdaptiveCardInputCheckbox({
  element,
  onChange,
  value,
}: AdaptiveCardInputCheckboxProps) {
  const selectedValues = Array.isArray(value) ? value : [];

  const handleCheckboxChange = (choiceValue: string, checked: boolean) => {
    const newValues = checked
      ? [...selectedValues, choiceValue]
      : selectedValues.filter((v) => v !== choiceValue);
    onChange(element.id, newValues);
  };

  return (
    <Field
      inputId={element.id}
      label={element.label}
      required={element.isRequired}
    >
      {element.choices?.map((choice) => (
        <Checkbox
          checked={selectedValues.includes(choice.value)}
          key={choice.value}
          onCheckedChange={(checked) =>
            handleCheckboxChange(choice.value, !!checked)
          }
        >
          {choice.title}
        </Checkbox>
      ))}
    </Field>
  );
}

AdaptiveCardInputCheckbox.displayName =
  "@optiaxiom/react/AdaptiveCardInputCheckbox";
