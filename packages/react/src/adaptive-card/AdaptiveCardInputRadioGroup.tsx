import type { InputRadioGroupElement } from "./types";

import { Field } from "../field";
import { Flex } from "../flex";
import { Radio, RadioGroup } from "../radio";

export type AdaptiveCardInputRadioGroupProps = {
  /**
   * The radio group input element configuration
   */
  element: InputRadioGroupElement;
  /**
   * Callback function when the radio selection changes
   */
  onChange: (id: string, value: unknown) => void;
  /**
   * Currently selected radio value
   */
  value: string;
};

export function AdaptiveCardInputRadioGroup({
  element,
  onChange,
  value,
}: AdaptiveCardInputRadioGroupProps) {
  return (
    <Field
      inputId={element.id}
      label={element.label}
      required={element.isRequired}
    >
      <RadioGroup
        onValueChange={(newValue) => onChange(element.id, newValue)}
        value={value || ""}
      >
        <Flex flexDirection="column" gap="8">
          {element.choices?.map((choice) => (
            <Radio key={choice.value} value={choice.value}>
              {choice.title}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </Field>
  );
}

AdaptiveCardInputRadioGroup.displayName =
  "@optiaxiom/react/AdaptiveCardInputRadioGroup";
