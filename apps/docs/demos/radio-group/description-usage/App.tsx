import { Radio, RadioGroup } from "@optiaxiom/react";

export function App() {
  return (
    <RadioGroup name="description-usage">
      <Radio description="Helper Text" value="one">
        Option One
      </Radio>
      <Radio value="two">Option Two</Radio>
    </RadioGroup>
  );
}
